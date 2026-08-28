import type { IInsertUser } from '@/modules/user/infrastructure/schemas/user.schema';

export type TCreateUser = Partial<IInsertUser> &
    Required<Pick<IInsertUser, 'role' | 'createdAt' | 'updatedAt'>>;
