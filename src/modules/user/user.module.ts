import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserOrmEntity } from '@/modules/user/infrastructure/entities/user.orm.entity';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserOrmEntity])],
    providers: [UserRepository],
})
export class UserModule {}
