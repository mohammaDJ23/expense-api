import type { TInsertUser, TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

export interface IUserEntity extends TSelectUser, TInsertUser {}
