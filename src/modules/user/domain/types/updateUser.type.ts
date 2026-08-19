import type { IInsertUser } from '@/modules/user/infrastructure/schemas/user.schema';

export type TUpdateUser = Partial<IInsertUser> & Required<Pick<IInsertUser, 'updatedAt' | 'id'>>;
