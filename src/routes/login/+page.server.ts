import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { LoginSchema } from '$lib/domain/identity';
import { IdentityService } from '$lib/services/identity';
import { env } from '$env/dynamic/private'

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		const formData = LoginSchema.safeParse(Object.fromEntries(data.entries()));

		if (!formData.success) {
			return fail(400, { success: false });
		}

		const resp = await IdentityService.getInstance().login(
			formData.data.email,
			formData.data.password
		);

		if (!resp.success) {
			return fail(401, { success: false });
		}

		// We are good to go
		const isProduction = env.NODE_ENV === 'production';

		cookies.set('session', resp.data!.access_token, {
			path: '/',
			maxAge: 60 * 60 * 2, // 2 hours
			httpOnly: isProduction,
			sameSite: 'lax',
			secure: isProduction,
		});

		cookies.set(
			'user',
			JSON.stringify({
				name: resp.data!.first_name,
				initials: resp.data!.initials,
				orgName: resp.data!.org_name
			}),
			{
				path: '/',
				maxAge: 60 * 60 * 2, // 2 hours
				httpOnly: isProduction,
				sameSite: 'lax',
				secure: isProduction,
			}
		);

		redirect(303, '/home/dashboard');
	}
} satisfies Actions;
