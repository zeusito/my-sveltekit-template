import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { LoginWithOTPSchema, VerifyOTPSchema } from '$lib/models/identity';
import { env } from '$env/dynamic/private';
import { IdentityService } from '$lib/server/gateway/identity';
import { logger } from '$lib/logger';

export const actions = {
	sendOTP: async (event) => {
		const data = await event.request.formData();

		logger.info('signing in');

		const formData = LoginWithOTPSchema.safeParse(Object.fromEntries(data.entries()));

		if (!formData.success) {
			return fail(400, { success: false, step: 1, error: 'Invalid Credentials' });
		}

		const resp = await IdentityService.getInstance().loginWithEmailOTP(formData.data.email);

		if (!resp.success) {
			return fail(400, {
				success: false,
				step: 1,
				error: resp.error?.message.includes('locked')
					? 'Account is locked, Please wait 30 minutes'
					: 'Invalid Credentials'
			});
		}

		return {
			success: true,
			step: 2,
			email: formData.data.email.toLowerCase()
		};
	},
	validateOTP: async (event) => {
		const data = await event.request.formData();

		const formData = VerifyOTPSchema.safeParse(Object.fromEntries(data.entries()));

		if (!formData.success) {
			return fail(400, { success: false, step: 2, error: 'Invalid Credentials' });
		}

		const resp = await IdentityService.getInstance().verifyOTP(
			formData.data.email.toLowerCase(),
			formData.data.code
		);

		if (!resp.success) {
			return fail(400, {
				success: false,
				step: 2,
				error: 'Invalid Credentials'
			});
		}

		// We are good to go
		const isProduction = env.NODE_ENV === 'production';

		event.cookies.set('session', resp.data!.accessToken, {
			path: '/',
			maxAge: 60 * 60 * 24 * 5, // 5 days
			httpOnly: isProduction,
			sameSite: 'lax',
			secure: isProduction
		});

		redirect(303, '/portal/studies');
	}
} satisfies Actions;
