export interface ILocalAccountVerificationTokenPayload {
    email: string;
    type: 'LOCAL_ACCOUNT_VERIFICATION';
    issuedAt: string;
}
