import { ClaimsService } from '$lib/services/claims';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { cookies, locals, url } = event;

	const session = cookies.get('session');
	const userData = cookies.get('user');

	// Anonymous user claims
	const claims = {
		authenticated: false,
		name: 'Anonymous',
		initials: 'AN',
		orgName: 'None'
	};

	// Authenticated user claims
	if (session && userData) {
		const decodedData = JSON.parse(userData);

		claims.authenticated = true;
		claims.name = decodedData.name;
		claims.initials = decodedData.initials;
		claims.orgName = decodedData.orgName;
	}

	// Protected paths require the user to be authenticated
	if (url.pathname.startsWith('/home')) {
		if (!claims.authenticated) {
			console.log('unauthenticated, redirecting to login');
			throw redirect(303, "/login");
		}
	}

	locals.claims = new ClaimsService(claims);

	return await resolve(event);
};
