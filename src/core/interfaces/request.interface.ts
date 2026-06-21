import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

export interface IRequest extends Request {
    user?: ISelectUser;
}
