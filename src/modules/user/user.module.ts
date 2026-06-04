import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateUserHandler } from '@/modules/user/applications/commands/createUser/createUser.handler';
import { GetUserByEmailHandler } from '@/modules/user/applications/queries/getUserByEmail/getUserByEmail.handler';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

@Module({
    imports: [CqrsModule],
    providers: [UserRepository, CreateUserHandler, GetUserByEmailHandler],
    exports: [CqrsModule],
})
export class UserModule {}
