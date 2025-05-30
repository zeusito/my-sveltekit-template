import { env } from '$env/dynamic/private';
import { logger } from '$lib/logger';
import axios, { AxiosError } from 'axios';

export class APIError extends Error {
	code: string;

	constructor(code: string, message: string) {
		super(message);
		this.code = code;
	}

	static fromAxiosError(error: AxiosError): APIError {
		const code = error.response?.data?.code || 'UNKNOWN_ERROR';
		const message = error.response?.data?.message || 'An unknown error occurred';
		return new APIError(code, message);
	}
}

export interface Result<T, E = Error> {
	success: boolean;
	data?: T;
	error?: E;
}

export interface GenericResponse {
	success: boolean;
}

export interface GenericStringErrorResponse {
	message: string;
}

const API_URL = env.BACKEND_API || 'http://localhost:3000';

export const backendAPI = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 10000
});

export const logAndHandleAxiosError = (action: string, error: unknown): APIError => {
	if (axios.isAxiosError(error)) {
		const axiosError = error as AxiosError;
		const errorDataString = JSON.stringify(axiosError.response?.data, null, 2);
		logger.error(
			`${action} call failed (${axiosError.code}). Status: ${axiosError.response?.status}, Message: ${errorDataString}`
		);
		return APIError.fromAxiosError(axiosError);
	} else {
		logger.error(`${action} call failed with unknown error:`, error);
		return new APIError('UNKNOWN_ERROR', 'An unknown error occurred');
	}
};
