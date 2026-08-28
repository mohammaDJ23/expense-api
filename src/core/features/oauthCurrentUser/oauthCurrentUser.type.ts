import type { ICurrentUser } from '@/core/features/currentUser/currentUser.type';

export interface IOauthCurrentUser extends ICurrentUser {
    oauthAccountId: string;
}
