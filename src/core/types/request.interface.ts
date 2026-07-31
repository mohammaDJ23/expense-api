import type { ICurrentUser } from '@/core/authentication/currentUser.type';

export interface IRequest extends Request {
    user?: ICurrentUser;
}
