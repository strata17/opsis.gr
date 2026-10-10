import { defineMiddleware } from 'astro:middleware';
import { COOKIE, validSession } from './lib/auth';

export const onRequest = defineMiddleware(async (ctx, next) => {
  const { pathname } = ctx.url;
  if (!pathname.startsWith('/admin') || pathname.startsWith('/admin/login')) return next();
  if (!validSession(ctx.cookies.get(COOKIE)?.value)) return ctx.redirect('/admin/login', 303);
  const res = await next();
  res.headers.set('Cache-Control', 'private, no-store');
  res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  return res;
});
