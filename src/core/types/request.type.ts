import type { ICurrentUser } from '@/core/authentication/currentUser.type';
import type { Request } from 'express';

export interface IRequest extends Request {
    user?: ICurrentUser;
    clientTimezone?: string;
}
