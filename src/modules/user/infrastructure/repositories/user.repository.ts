import { Injectable } from '@nestjs/common';

import { UserEntity } from '@/modules/user/domain/entities/user.entity';

import type { IUserRepository } from '@/modules/user/domain/interfaces/userRepository.interface';
import type { UserOrmEntity } from '@/modules/user/infrastructure/entities/user.orm.entity';
import type { Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(private readonly userRepository: Repository<UserOrmEntity>) {}

    create(data: Partial<UserEntity>): Promise<UserEntity> {
        return Promise.resolve(UserEntity.create(data));
    }

    update(data: Partial<UserEntity>): Promise<UserEntity> {
        return Promise.resolve(UserEntity.create(data));
    }
}
