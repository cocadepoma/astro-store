import { defineMiddleware } from 'astro:middleware';
import { getSession } from 'auth-astro/server';

const notAuthenticatedRoutes = ['/login', '/register'];

export const onRequest = defineMiddleware(
  async ({ url, locals, redirect, request }, next) => {
    const session = await getSession(request);
    const isLoggedIn = !!session;

    locals.isLoggedIn = isLoggedIn;
    locals.user = null;
    locals.isAdmin = false;

    if (isLoggedIn) {
      locals.user = {
        name: session.user?.name!,
        email: session.user?.email!,
        // avatar: user.photoURL ?? '',
        // emailVerified: user.emailVerified,
      };

      locals.isAdmin = session.user?.role === 'admin';
    }

    if (!locals.isAdmin && url.pathname.startsWith('/dashboard')) {
      return redirect('/');
    }

    if (isLoggedIn && notAuthenticatedRoutes.includes(url.pathname)) {
      return redirect('/');
    }

    return next();
  }
);
