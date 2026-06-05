export interface IForgotPasswordPayload {
    id: string;
    email: string;
    type: 'FORGOT_PASSWORD';
    issuedAt: string;
}
