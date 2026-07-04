import type { ICurrentUser } from '@/core/authentication/currentUser.interface';

export interface IRequest extends Request {
    user?: ICurrentUser;
}
