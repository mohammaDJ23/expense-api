import type { TInsertUser, TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

export interface IUserRepository {
    create(data: TInsertUser): Promise<TSelectUser>;
    update(data: Partial<TSelectUser> & Required<Pick<TSelectUser, 'id'>>): Promise<TSelectUser>;
    isExistsByEmail(email: string): Promise<boolean>;
    getByEmailOrThrow(email: string): Promise<TSelectUser>;
    getByEmail(email: string): Promise<TSelectUser | null>;
    isExistsById(id: string): Promise<boolean>;
    getByIdOrThrow(id: string): Promise<TSelectUser>;
    getById(id: string): Promise<TSelectUser | null>;
}
