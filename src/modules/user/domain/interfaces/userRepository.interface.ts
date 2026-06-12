import type { TInsertUser, TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

export interface IUserRepository {
    create(data: TInsertUser): Promise<TSelectUser>;
    update(data: Partial<TSelectUser> & Required<Pick<TSelectUser, 'id'>>): Promise<TSelectUser>;
    deleteAllNotVerified(): Promise<TSelectUser[]>;
    isExistsByEmail(email: string): Promise<boolean>;
    getByEmailOrNull(email: string): Promise<TSelectUser | null>;
    isExistsById(id: string): Promise<boolean>;
    getByIdOrNull(id: string): Promise<TSelectUser | null>;
}
