import { z } from 'zod';

export const LoginSchema = z.object({
	email: z.string().email({ message: 'must be a valid email' }),
	password: z.string().min(8, 'Password must contain at least 8 character(s)').max(50)
});

export const RegisterSchema = z
	.object({
		code: z.string().max(100),
		email: z.string().email({ message: 'must be a valid email' }).max(100),
		password: z.string().min(8, 'Password must contain at least 8 character(s)').max(30),
		password2: z.string().min(8, 'Password2 must contain at least 8 character(s)').max(30),
		firstName: z.string().min(1, 'First name must contain at least 1 character(s)').max(100),
		lastName: z.string().min(1, 'Last name must contain at least 1 character(s)').max(100)
	})
	.refine((data) => data.password === data.password2, { message: 'Passwords do not match' });

export type CreateIdentity = z.infer<typeof RegisterSchema>;

export interface AuthResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	refresh_token: string;
	first_name: string;
	initials: string;
	org_name: string;
}
