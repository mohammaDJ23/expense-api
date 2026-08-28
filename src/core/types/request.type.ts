import type { ICurrentUser } from '@/core/features/currentUser/currentUser.type';
import type { IOauthCurrentUser } from '@/core/features/oauthCurrentUser/oauthCurrentUser.type';
import type { Request } from 'express';

export interface IRequest extends Request {
    user?: ICurrentUser | IOauthCurrentUser;
    clientTimezone?: string;
}
