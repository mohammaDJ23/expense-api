export interface IVerificationPayload {
    id: string;
    email: string;
    type: 'VERIFICATION';
    issuedAt: string;
}
