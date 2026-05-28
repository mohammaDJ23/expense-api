import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateUserHandler } from '@/modules/user/applications/commands/createUser/createUser.handler';
import { PasswordHasherService } from '@/modules/user/applications/services/passwordHasher.service';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

@Module({
    imports: [CqrsModule],
    providers: [UserRepository, PasswordHasherService, CreateUserHandler],
    exports: [PasswordHasherService, CqrsModule],
})
export class UserModule {}
