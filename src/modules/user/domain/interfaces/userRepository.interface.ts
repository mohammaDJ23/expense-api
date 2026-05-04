import type { UserEntity } from '@/modules/user/domain/entities/user.entity';

export interface IUserRepository {
    create(data: Partial<UserEntity>): Promise<UserEntity>;
    update(data: Partial<UserEntity>): Promise<UserEntity>;
}
