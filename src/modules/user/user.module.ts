import { forwardRef, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthenticationModule } from '@/core/authentication/authentication.module';
import { CreateUserHandler } from '@/modules/user/applications/commands/createUser/createUser.handler';
import { DeleteManyNotVerifiedUsersHandler } from '@/modules/user/applications/commands/deleteManyNotVerifiedUsers/deleteManyNotVerifiedUsers.handler';
import { UpdateUserHandler } from '@/modules/user/applications/commands/updateUser/updateUser.handler';
import { GetUserByEmailOrNullHandler } from '@/modules/user/applications/queries/getUserByEmailOrNull/getUserByEmailOrNull.handler';
import { GetUserByIdOrNullHandler } from '@/modules/user/applications/queries/getUserByIdOrNull/getUserByIdOrNull.handler';
import { GetUserByIdOrThrowHandler } from '@/modules/user/applications/queries/getUserByIdOrThrow/getUserByIdOrThrow.handler';
import { IsUserExistsByEmailHandler } from '@/modules/user/applications/queries/isUserExistsByEmail/isUserExistsByEmail.handler';
import { CreateUserService } from '@/modules/user/applications/services/createUser.service';
import { DeleteManyNotVerifiedUsersService } from '@/modules/user/applications/services/deleteManyNotVerifiedUsers.service';
import { GetUserByEmailOrNullService } from '@/modules/user/applications/services/getUserByEmailOrNull.service';
import { GetUserByIdOrNullService } from '@/modules/user/applications/services/getUserByIdOrNull.service';
import { GetUserByIdOrThrowService } from '@/modules/user/applications/services/getUserByIdOrThrow.service';
import { IsUserExistsByEmailService } from '@/modules/user/applications/services/isUserExistsByEmail.service';
import { UpdateUserService } from '@/modules/user/applications/services/updateUser.service';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';
import { UserController } from '@/modules/user/interfaces/controllers/v1.controller';

@Module({
    imports: [CqrsModule, forwardRef(() => AuthenticationModule)],
    controllers: [UserController],
    providers: [
        UserRepository,
        CreateUserHandler,
        CreateUserService,
        UpdateUserService,
        GetUserByEmailOrNullHandler,
        GetUserByEmailOrNullService,
        GetUserByIdOrNullService,
        GetUserByIdOrThrowHandler,
        GetUserByIdOrThrowService,
        UpdateUserHandler,
        GetUserByIdOrNullHandler,
        IsUserExistsByEmailHandler,
        IsUserExistsByEmailService,
        DeleteManyNotVerifiedUsersService,
        DeleteManyNotVerifiedUsersHandler,
    ],
    exports: [
        CreateUserService,
        UpdateUserService,
        GetUserByEmailOrNullService,
        GetUserByIdOrNullService,
        IsUserExistsByEmailService,
    ],
})
export class UserModule {}
