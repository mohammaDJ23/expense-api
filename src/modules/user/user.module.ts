import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@/core/features/authentication/authentication.module';
import { AuthorizationModule } from '@/core/features/authorization/authorization.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateUserHandler } from '@/modules/user/applications/commands/createUser/createUser.handler';
import { DeleteManyNotVerifiedUsersHandler } from '@/modules/user/applications/commands/deleteManyNotVerifiedUsers/deleteManyNotVerifiedUsers.handler';
import { DeleteUserHandler } from '@/modules/user/applications/commands/deleteUser/deleteUser.handler';
import { UpdateUserHandler } from '@/modules/user/applications/commands/updateUser/updateUser.handler';
import { ExistsUserByEmailHandler } from '@/modules/user/applications/queries/existsUserByEmail/existsUserByEmail.handler';
import { ExistsUserByIdHandler } from '@/modules/user/applications/queries/existsUserById/existsUserById.handler';
import { FindTotalUsersHandler } from '@/modules/user/applications/queries/findTotalUsers/findTotalUsers.handler';
import { FindUserByEmailOrNullHandler } from '@/modules/user/applications/queries/findUserByEmailOrNull/findUserByEmailOrNull.handler';
import { FindUserByIdOrNullHandler } from '@/modules/user/applications/queries/findUserByIdOrNull/findUserByIdOrNull.handler';
import { FindUserByIdOrThrowHandler } from '@/modules/user/applications/queries/findUserByIdOrThrow/findUserByIdOrThrow.handler';
import { FindUserListHandler } from '@/modules/user/applications/queries/findUserList/findUserList.handler';
import { DeleteUserService } from '@/modules/user/applications/services/deleteUser.service';
import { FindUserListService } from '@/modules/user/applications/services/findUserList.service';
import { DeleteManyNotVerifiedUsersJob } from '@/modules/user/applications/services/jobs/deleteManyNotVerifiedUsers.job';
import { UpdateUserService } from '@/modules/user/applications/services/updateUser.service';
import { UserService } from '@/modules/user/applications/services/user.service';
import { UserExistenceValidatorService } from '@/modules/user/applications/services/validators/userExistenceValidator.service';
import { UserUniqueEmailValidatorService } from '@/modules/user/applications/services/validators/userUniqueEmailValidator.service';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';
import { UserController } from '@/modules/user/interfaces/controllers/v1.controller';

@Module({
    imports: [CqrsModule, AuthenticationModule, AuthorizationModule],
    controllers: [UserController],
    providers: [
        UserService,
        DeleteUserService,
        UpdateUserService,
        UserRepository,
        CreateUserHandler,
        UpdateUserHandler,
        ExistsUserByEmailHandler,
        DeleteManyNotVerifiedUsersHandler,
        FindTotalUsersHandler,
        ExistsUserByIdHandler,
        DeleteUserHandler,
        FindUserByEmailOrNullHandler,
        FindUserByIdOrNullHandler,
        FindUserByIdOrThrowHandler,
        FindUserListHandler,
        UserExistenceValidatorService,
        UserUniqueEmailValidatorService,
        FindUserListService,
        DeleteManyNotVerifiedUsersJob,
    ],
    exports: [UserUniqueEmailValidatorService, FindUserListService],
})
export class UserModule {}
