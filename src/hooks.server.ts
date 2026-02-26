import { logger } from '$lib/logger';
import { ANONYMOUS_CLAIMS, ClaimsService } from '$lib/models/claims';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies, locals, url } = event;

	// Login and logout routes should be accessible without authentication
	if (url.pathname.startsWith('/login') || url.pathname.startsWith('/logout')) {
		return resolve(event);
	}

	const session = cookies.get('session');

	// Anonymous user claims
	const claims = ANONYMOUS_CLAIMS;

	// If a session cookie exists, fetch the user profile and populate claims
	if (session) {
		claims.authenticated = true;
		claims.token = session;
	}

	// Protected paths require the user to be authenticated
	if (url.pathname.startsWith('/homes')) {
		if (!claims.authenticated || claims.roles.length === 0) {
			logger.error('unauthenticated access attempt to a protected resource, redirecting to login');
			throw redirect(303, '/login');
		}
	}

	locals.claims = new ClaimsService(claims);

	return await resolve(event);
};
