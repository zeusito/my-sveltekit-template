
export interface PrincipalClaims {
	readonly authenticated: boolean;
	readonly name: string;
	readonly initials: string;
	readonly orgName: string;
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
