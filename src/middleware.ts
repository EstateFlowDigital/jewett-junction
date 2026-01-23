import { defineMiddleware } from 'astro:middleware';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;

  // Handle root path - rewrite to /dashboard internally
  if (pathname === '/jewett-junction' || pathname === '/jewett-junction/') {
    return context.rewrite('/dashboard');
  }

  return next();
});
