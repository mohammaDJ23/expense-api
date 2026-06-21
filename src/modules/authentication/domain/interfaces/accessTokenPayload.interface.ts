import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

export interface IAccessTokenPayload extends Omit<ISelectUser, 'hashedPassword'> {
    type: 'ACCESS_TOKEN';
    issuedAt: string;
}
