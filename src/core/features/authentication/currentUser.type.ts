import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

export interface ICurrentUser extends Pick<ISelectUser, 'id' | 'role'> {}
