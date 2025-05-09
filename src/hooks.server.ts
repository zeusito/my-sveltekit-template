import { ClaimsService, type PrincipalClaims } from '$lib/domain/claims';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies, locals, url } = event;

	const session = cookies.get('session');
	const userData = cookies.get('user');

	// Anonymous user claims
	const claims: PrincipalClaims = {
		authenticated: false,
		token: ''
	};

	// Authenticated user claims
	if (session && userData) {
		claims.authenticated = true;
		claims.token = session;
	}

	// Protected paths require the user to be authenticated
	if (url.pathname.startsWith('/home')) {
		if (!claims.authenticated) {
			console.log('unauthenticated, redirecting to login');
			throw redirect(303, '/login');
		}
	}

	locals.claims = new ClaimsService(claims);

	return await resolve(event);
};
