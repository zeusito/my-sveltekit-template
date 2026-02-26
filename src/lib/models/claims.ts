export const ROLE_ORG_MEMBER = 'org_member';
export const ROLE_ORG_ADMIN = 'org_admin';

export interface PrincipalClaims {
	authenticated: boolean;
	token: string;
	email: string;
	firstName: string;
	lastName: string;
	orgId: string;
	orgName: string;
	roles: string[];
}

export const ANONYMOUS_CLAIMS: PrincipalClaims = {
	authenticated: false,
	token: '',
	email: '',
	firstName: '',
	lastName: '',
	orgId: '',
	orgName: '',
	roles: []
};

export class ClaimsService {
	private readonly claims: PrincipalClaims;

	constructor(claims: PrincipalClaims) {
		this.claims = claims;
	}

	public isAuthenticated(): boolean {
		return this.claims.authenticated;
	}

	public getClaims(): PrincipalClaims {
		return this.claims;
	}
}
