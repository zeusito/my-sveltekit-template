import type { AxiosInstance } from 'axios';
import {
	APIError,
	backendAPI,
	logAndHandleAxiosError,
	type GenericResponse,
	type Result
} from './common';
import type { AuthResponse, CreateIdentity } from '$lib/domain/identity';

export class IdentityService {
	private static instance: IdentityService;
	private backendAPI: AxiosInstance;

	private constructor() {
		this.backendAPI = backendAPI;
	}

	public static getInstance(): IdentityService {
		if (!IdentityService.instance) {
			IdentityService.instance = new IdentityService();
		}

		return IdentityService.instance;
	}

	public async login(username: string, password: string): Promise<Result<AuthResponse, APIError>> {
		try {
			const response = await this.backendAPI.post('/auth/login', {
				email: username,
				password
			});

			return {
				success: true,
				data: response.data
			};
		} catch (error) {
			const apiError = logAndHandleAxiosError('login', error);

			return {
				success: false,
				error: apiError
			};
		}
	}

	public async register(data: CreateIdentity): Promise<Result<GenericResponse, APIError>> {
		try {
			await this.backendAPI.post('/auth/signup', {
				invitation_id: data.code,
				email: data.email,
				password: data.password,
				first_name: data.firstName,
				last_name: data.lastName
			});

			return {
				success: true
			};
		} catch (error) {
			const apiError = logAndHandleAxiosError('register', error);

			return {
				success: false,
				error: apiError
			};
		}
	}
}
