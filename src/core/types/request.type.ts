import type { ICurrentUser } from '@/core/features/currentUser/currentUser.type';
import type { Request } from 'express';

export interface IRequest extends Request {
    user?: ICurrentUser;
    clientTimezone?: string;
}
