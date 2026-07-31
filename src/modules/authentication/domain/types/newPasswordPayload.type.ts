export interface INewPasswordPayload {
    id: string;
    email: string;
    type: 'NEW_PASSWORD';
    issuedAt: string;
}
