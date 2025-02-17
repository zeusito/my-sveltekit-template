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

const API_URL = env.BACKEND_API || 'http://localhost:3000';

export const backendAPI = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 10000
});
