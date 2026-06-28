import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@/core/authentication/authentication.module';
import { OwnerGuard } from '@/core/guards/owner.guard';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateUserHandler } from '@/modules/user/applications/commands/createUser/createUser.handler';
import { DeleteManyNotVerifiedUsersHandler } from '@/modules/user/applications/commands/deleteManyNotVerifiedUsers/deleteManyNotVerifiedUsers.handler';
import { DeleteUserHandler } from '@/modules/user/applications/commands/deleteUser/deleteUser.handler';
import { UpdateUserHandler } from '@/modules/user/applications/commands/updateUser/updateUser.handler';
import { FindUserByEmailOrNullHandler } from '@/modules/user/applications/queries/findUserByEmailOrNull/findUserByEmailOrNull.handler';
import { FindUserByIdOrNullHandler } from '@/modules/user/applications/queries/findUserByIdOrNull/findUserByIdOrNull.handler';
import { FindUserByIdOrThrowHandler } from '@/modules/user/applications/queries/findUserByIdOrThrow/findUserByIdOrThrow.handler';
import { FindUserListHandler } from '@/modules/user/applications/queries/findUserList/findUserList.handler';
import { IsUserExistsByEmailHandler } from '@/modules/user/applications/queries/isUserExistsByEmail/isUserExistsByEmail.handler';
import { IsUserExistsByIdHandler } from '@/modules/user/applications/queries/isUserExistsById/isUserExistsById.handler';
import { DeleteUserService } from '@/modules/user/applications/services/deleteUser.service';
import { UserService } from '@/modules/user/applications/services/user.service';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';
import { UserController } from '@/modules/user/interfaces/controllers/v1.controller';

@Module({
    imports: [CqrsModule, AuthenticationModule],
    controllers: [UserController],
    providers: [
        UserService,
        DeleteUserService,
        UserRepository,
        CreateUserHandler,
        UpdateUserHandler,
        IsUserExistsByEmailHandler,
        DeleteManyNotVerifiedUsersHandler,
        IsUserExistsByIdHandler,
        DeleteUserHandler,
        FindUserByEmailOrNullHandler,
        FindUserByIdOrNullHandler,
        FindUserByIdOrThrowHandler,
        FindUserListHandler,
        OwnerGuard,
    ],
})
export class UserModule {}
