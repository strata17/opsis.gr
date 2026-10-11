// Single-owner admin auth. The password lives only in the ADMIN_PASSWORD environment variable;
// the session cookie is an HMAC of a fixed label, so changing the password signs everyone out.
import { createHmac, timingSafeEqual } from 'node:crypto';

export const COOKIE = 'opsis_admin';
const MAX_AGE = 60 * 60 * 24 * 3; // 3 days

// Read at runtime only (process.env), never inlined at build. ADMIN_SESSION_EPOCH lets you sign out every
// session without changing the password: bump it in Vercel and redeploy.
const secret = () => process.env.ADMIN_PASSWORD ?? '';
const epoch = () => process.env.ADMIN_SESSION_EPOCH ?? '1';
const sign = (value: string) => createHmac('sha256', secret()).update(value).digest('hex');
const same = (a: string, b: string) => {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

// Best-effort limiter per serverless instance: 5 failed attempts per IP per 15 minutes.
// For a hard limit across instances, add a Vercel Firewall rate-limit rule on POST /admin/login.
const fails = new Map<string, { n: number; until: number }>();
export function blocked(ip: string) { const f = fails.get(ip); return !!f && f.n >= 5 && f.until > Date.now(); }
export function recordFail(ip: string) {
  const f = fails.get(ip); const now = Date.now();
  if (!f || f.until < now) fails.set(ip, { n: 1, until: now + 15 * 60_000 }); else f.n++;
}
export const clearFails = (ip: string) => fails.delete(ip);
export const configured = () => secret().length >= 12;
export const checkPassword = (input: string) => configured() && same(sign(input), sign(secret()));

export function sessionToken() {
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE;
  return `${expires}.${sign(`admin:${epoch()}:${expires}`)}`;
}
export function validSession(token: string | undefined) {
  if (!token || !configured()) return false;
  const [exp, mac] = token.split('.');
  if (!exp || !mac || Number(exp) < Date.now() / 1000) return false;
  return same(mac, sign(`admin:${epoch()}:${exp}`));
}
export const cookieOptions = { httpOnly: true, secure: true, sameSite: 'strict' as const, path: '/admin', maxAge: MAX_AGE };
