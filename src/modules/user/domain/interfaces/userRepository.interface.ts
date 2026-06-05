import type { UserEntity } from '@/modules/user/domain/entities/user.entity';
import type { TInsertUser, TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

export interface IUserRepository {
    create(data: Omit<UserEntity, 'id'>): Promise<TInsertUser>;
    update(id: string, data: Partial<TSelectUser>): Promise<TSelectUser>;
    isExistsByEmail(email: string): Promise<boolean>;
    getByEmailOrThrow(email: string): Promise<TSelectUser>;
    getByEmail(email: string): Promise<TSelectUser | null>;
    isExistsById(id: string): Promise<boolean>;
    getByIdOrThrow(id: string): Promise<TSelectUser>;
    getById(id: string): Promise<TSelectUser | null>;
}
