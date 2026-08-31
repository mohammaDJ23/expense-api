export interface INewPasswordTokenPayload {
    email: string;
    type: 'NEW_PASSWORD';
    issuedAt: string;
}
