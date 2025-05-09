import { env } from '$env/dynamic/private';
import axios from 'axios';

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

export const logAxiosError = (action: string, error: unknown) => {
	if (axios.isAxiosError(error)) {
		const axiosError = error as AxiosError;
		const errorDataString = JSON.stringify(axiosError.response?.data, null, 2);
		console.error(
			`${action} call failed: Status: ${axiosError.response?.status}, Message: ${errorDataString}`
		);
	} else {
		console.error(`${action} call failed:`, error);
	}
};
