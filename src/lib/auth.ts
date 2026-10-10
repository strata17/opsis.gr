// Single-owner admin auth. The password lives only in the ADMIN_PASSWORD environment variable;
// the session cookie is an HMAC of a fixed label, so changing the password signs everyone out.
import { createHmac, timingSafeEqual } from 'node:crypto';

export const COOKIE = 'opsis_admin';
const MAX_AGE = 60 * 60 * 24 * 14; // 14 days

const secret = () => import.meta.env.ADMIN_PASSWORD ?? process.env.ADMIN_PASSWORD ?? '';
const sign = (value: string) => createHmac('sha256', secret()).update(value).digest('hex');
const same = (a: string, b: string) => {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

export const configured = () => secret().length >= 12;
export const checkPassword = (input: string) => configured() && same(sign(input), sign(secret()));

export function sessionToken() {
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE;
  return `${expires}.${sign(`admin:${expires}`)}`;
}
export function validSession(token: string | undefined) {
  if (!token || !configured()) return false;
  const [exp, mac] = token.split('.');
  if (!exp || !mac || Number(exp) < Date.now() / 1000) return false;
  return same(mac, sign(`admin:${exp}`));
}
export const cookieOptions = { httpOnly: true, secure: true, sameSite: 'strict' as const, path: '/admin', maxAge: MAX_AGE };
