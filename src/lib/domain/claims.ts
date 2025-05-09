export interface PrincipalClaims {
	authenticated: boolean;
	token: string;
}

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
