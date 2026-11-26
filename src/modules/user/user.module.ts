import { forwardRef, Module } from '@nestjs/common';

import { AuthorizationModule } from '@/core/features/authorization/authorization.module';
import { JWTModule } from '@/core/features/jwt/jwt.module';
import { CursorPaginationModule } from '@/core/features/pagination/cursor/cursorPagination.module';
import { QueryCacheModule } from '@/core/features/queryCache/queryCache.module';
import { QueryDispatcherModule } from '@/core/features/queryDispatcher/queryDispatcher.module';
import { ProjectionService } from '@/core/services/projection.service';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { ElasticsearchModule } from '@/infrastructure/elasticsearch/elasticsearch.module';
import { BillModule } from '@/modules/bill/bill.module';
import { ConsumerModule } from '@/modules/consumer/consumer.module';
import { LocationModule } from '@/modules/location/location.module';
import { OutboxModule } from '@/modules/outbox/outbox.module';
import { ReceiverModule } from '@/modules/receiver/receiver.module';
import { CreateUserHandler } from '@/modules/user/applications/commands/createUser/createUser.handler';
import { DeleteUserHandler } from '@/modules/user/applications/commands/deleteUser/deleteUser.handler';
import { UpdateUserHandler } from '@/modules/user/applications/commands/updateUser/updateUser.handler';
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
import { UserCacheInvalidatorService } from '@/modules/user/infrastructure/cache/userCacheInvalidator.service';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';
import { UserController } from '@/modules/user/interfaces/controllers/v1.controller';

@Module({
    imports: [
        CqrsModule,
        AuthorizationModule,
        OutboxModule,
        QueryDispatcherModule,
        QueryCacheModule,
        CursorPaginationModule,
        JWTModule,
        ElasticsearchModule,
        forwardRef(() => BillModule),
        ConsumerModule,
        LocationModule,
        ReceiverModule,
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
        FindUserIdListHandler,
        FindUserIdListService,
        UserListCursorPaginationDefinition,
        UserIdListCursorPaginationDefinition,
        UserCacheInvalidatorService,
        ProjectionService,
    ],
    exports: [UpdateUserService, CreateUserService, FindUserIdListService],
})
export class UserModule {}
