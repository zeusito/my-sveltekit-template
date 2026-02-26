import { z } from 'zod/v4';

export const LoginWithOTPSchema = z.object({
	email: z.email({ error: 'must be a valid email' }).max(100)
});

export const VerifyOTPSchema = z.object({
	code: z.string().min(6, 'Code must contain at least 6 character(s)').max(6),
	email: z.email({ error: 'must be a valid email' }).max(100)
});

export interface AuthResponse {
	accessToken: string;
	tokenType: string;
	expiresIn: number;
}

export interface IdentityProfile {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	orgId: string;
	orgName: string;
	orgRoles: string[];
}
