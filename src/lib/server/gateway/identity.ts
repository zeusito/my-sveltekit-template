import type { AuthResponse } from '$lib/models/identity';
import type { GenericResponse, Result } from './common';
import { APIError, fetchWithTimeout, handleFetchResponse, logAndHandleFetchError } from './common';

export class IdentityService {
	private static instance: IdentityService;

	private constructor() {}

	public static getInstance(): IdentityService {
		if (!IdentityService.instance) {
			IdentityService.instance = new IdentityService();
		}

		return IdentityService.instance;
	}

	public loginWithEmailOTP = async (
		username: string
	): Promise<Result<GenericResponse, APIError>> => {
		try {
			const response = await fetchWithTimeout('/v1/hq/auth/otp/login', {
				method: 'POST',
				body: JSON.stringify({
					email: username,
					source: 'web'
				})
			});

			await handleFetchResponse(response);

			return {
				success: true,
				data: { success: true }
			};
		} catch (error) {
			const apiError = logAndHandleFetchError('loginWithEmailOTP', error);

			return {
				success: false,
				error: apiError
			};
		}
	};

	public verifyOTP = async (
		username: string,
		otp: string
	): Promise<Result<AuthResponse, APIError>> => {
		try {
			const response = await fetchWithTimeout('/v1/hq/auth/otp/verify', {
				method: 'POST',
				body: JSON.stringify({
					email: username,
					code: otp
				})
			});

			const data = await handleFetchResponse<AuthResponse>(response);

			return {
				success: true,
				data
			};
		} catch (error) {
			const apiError = logAndHandleFetchError('verifyOTP', error);

			return {
				success: false,
				error: apiError
			};
		}
	};
}
