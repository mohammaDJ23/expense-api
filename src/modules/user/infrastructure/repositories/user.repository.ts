import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { UserOrmEntity } from '@/modules/user/infrastructure/entities/user.orm.entity';

import type { IUserRepository } from '@/modules/user/domain/interfaces/userRepository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserOrmEntity) private readonly userRepository: Repository<UserOrmEntity>,
    ) {
        console.log(this.userRepository);
    }

    create(data: Partial<UserEntity>): Promise<UserEntity> {
        return Promise.resolve(UserEntity.create(data));
    }

    update(data: Partial<UserEntity>): Promise<UserEntity> {
        return Promise.resolve(UserEntity.create(data));
    }
}
