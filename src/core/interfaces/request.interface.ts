import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

export interface IRequest extends Request {
    user?: TSelectUser;
}
