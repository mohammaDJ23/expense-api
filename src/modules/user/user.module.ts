import { forwardRef, Module } from '@nestjs/common';

import { AuthenticationModule } from '@/core/features/authentication/authentication.module';
import { AuthorizationModule } from '@/core/features/authorization/authorization.module';
import { CacheModule } from '@/core/features/cache/cache.module';
import { CursorPaginationModule } from '@/core/features/pagination/cursor/cursorPagination.module';
import { QueryDispatcherModule } from '@/core/features/queryDispatcher/queryDispatcher.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { OutboxModule } from '@/modules/outbox/outbox.module';
import { CreateUserHandler } from '@/modules/user/applications/commands/createUser/createUser.handler';
import { DeleteUserHandler } from '@/modules/user/applications/commands/deleteUser/deleteUser.handler';
import { UpdateUserHandler } from '@/modules/user/applications/commands/updateUser/updateUser.handler';
import { CreatedUserCacheInvalidatorHandler } from '@/modules/user/applications/messages/createdUser/createdUserCacheInvalidator.handler';
import { DeletedUserCacheInvalidatorHandler } from '@/modules/user/applications/messages/deletedUser/deletedUserCacheInvalidator.handler';
import { UpdatedUserCacheInvalidatorHandler } from '@/modules/user/applications/messages/updatedUser/updatedUserCacheInvalidator.handler';
import { UserCacheInvalidatorProcessor } from '@/modules/user/applications/messages/userCacheInvalidator.processor';
import { UserIdListCursorPaginationDefinition } from '@/modules/user/applications/pagination/cursor/userIdListCursorPagination.definition';
import { UserListCursorPaginationDefinition } from '@/modules/user/applications/pagination/cursor/userListCursorPagination.definition';
import { ExistsUserByIdHandler } from '@/modules/user/applications/queries/existsUserById/existsUserById.handler';
import { FindTotalUsersHandler } from '@/modules/user/applications/queries/findTotalUsers/findTotalUsers.handler';
import { FindUserByIdOrNullHandler } from '@/modules/user/applications/queries/findUserByIdOrNull/findUserByIdOrNull.handler';
import { FindUserByIdOrThrowHandler } from '@/modules/user/applications/queries/findUserByIdOrThrow/findUserByIdOrThrow.handler';
import { FindUserIdListHandler } from '@/modules/user/applications/queries/findUserIdList/findUserIdList.handler';
import { FindUserListHandler } from '@/modules/user/applications/queries/findUserList/findUserList.handler';
import { CreateUserService } from '@/modules/user/applications/services/createUser.service';
import { DeleteUserService } from '@/modules/user/applications/services/deleteUser.service';
import { FindUserIdListService } from '@/modules/user/applications/services/findUserIdList.service';
import { FindUserListService } from '@/modules/user/applications/services/findUserList.service';
import { FindUserListAndTotalService } from '@/modules/user/applications/services/findUserListAndTotal.service';
import { UpdateUserService } from '@/modules/user/applications/services/updateUser.service';
import { UserService } from '@/modules/user/applications/services/user.service';
import { UserExistenceValidatorService } from '@/modules/user/applications/services/validators/userExistenceValidator.service';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';
import { UserController } from '@/modules/user/interfaces/controllers/v1.controller';

@Module({
    imports: [
        CqrsModule,
        forwardRef(() => AuthenticationModule),
        AuthorizationModule,
        OutboxModule,
        QueryDispatcherModule,
        CacheModule,
        CursorPaginationModule,
    ],
    controllers: [UserController],
    providers: [
        UserService,
        DeleteUserService,
        UpdateUserService,
        CreateUserService,
        UserRepository,
        CreateUserHandler,
        UpdateUserHandler,
        FindTotalUsersHandler,
        ExistsUserByIdHandler,
        DeleteUserHandler,
        FindUserByIdOrNullHandler,
        FindUserByIdOrThrowHandler,
        FindUserListHandler,
        UserExistenceValidatorService,
        FindUserListService,
        FindUserListAndTotalService,
        CreatedUserCacheInvalidatorHandler,
        DeletedUserCacheInvalidatorHandler,
        UpdatedUserCacheInvalidatorHandler,
        UserCacheInvalidatorProcessor,
        FindUserIdListHandler,
        FindUserIdListService,
        UserListCursorPaginationDefinition,
        UserIdListCursorPaginationDefinition,
    ],
    exports: [UpdateUserService, CreateUserService, FindUserIdListService],
})
export class UserModule {}
