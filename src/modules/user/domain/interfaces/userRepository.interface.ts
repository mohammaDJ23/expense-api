import type { UserEntity } from '@/modules/user/domain/entities/user.entity';
import type { TRequiredInsertUser } from '@/modules/user/infrastructure/schemas/user.schema';

export interface IUserRepository {
    create(data: Omit<UserEntity, 'id'>): Promise<TRequiredInsertUser>;
    isExistsByEmail(email: string): Promise<boolean>;
}
