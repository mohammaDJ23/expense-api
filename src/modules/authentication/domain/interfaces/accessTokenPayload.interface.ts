import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

export interface IAccessTokenPayload extends Omit<TSelectUser, 'hashedPassword'> {
    issuedAt: string;
}
