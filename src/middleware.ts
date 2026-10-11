import { defineMiddleware } from 'astro:middleware';
import { COOKIE, validSession } from './lib/auth';

// CSRF guard for admin form posts: the browser's Origin must match the host it actually reached.
function sameOrigin(req: Request) {
  const origin = req.headers.get('origin');
  if (!origin) return true; // old browsers omit it; SameSite=Strict cookies still apply
  // Trusts x-forwarded-host because Vercel's edge sets it; revisit if the site leaves Vercel.
  const host = req.headers.get('x-forwarded-host') ?? req.headers.get('host');
  try { return new URL(origin).host === host; } catch { return false; }
}

export const onRequest = defineMiddleware(async (ctx, next) => {
  const { pathname } = ctx.url;
  if (pathname.startsWith('/admin') && ctx.request.method === 'POST' && !sameOrigin(ctx.request)) {
    return new Response('Forbidden', { status: 403 });
  }
  const isLogin = pathname === '/admin/login' || pathname === '/admin/login/';
  if (!pathname.startsWith('/admin') || isLogin) return next();
  if (!validSession(ctx.cookies.get(COOKIE)?.value)) return ctx.redirect('/admin/login', 303);
  const res = await next();
  res.headers.set('Cache-Control', 'private, no-store');
  res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return res;
});
