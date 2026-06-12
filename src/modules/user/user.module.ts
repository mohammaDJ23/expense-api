import { Module } from '@nestjs/common';

import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateUserHandler } from '@/modules/user/applications/commands/createUser/createUser.handler';
import { DeleteAllNotVerifiedUsersHandler } from '@/modules/user/applications/commands/deleteAllNotVerifiedUsers/deleteNotVerifiedUsers.handler';
import { UpdateUserHandler } from '@/modules/user/applications/commands/updateUser/updateUser.handler';
import { GetUserByEmailOrNullHandler } from '@/modules/user/applications/queries/getUserByEmailOrNull/getUserByEmailOrNull.handler';
import { GetUserByIdOrNullHandler } from '@/modules/user/applications/queries/getUserByIdOrNull/getUserByIdOrNull.handler';
import { IsUserExistsByEmailHandler } from '@/modules/user/applications/queries/isUserExistsByEmail/isUserExistsByEmail.handler';
import { DeleteAllNotVerifiedUsersService } from '@/modules/user/applications/services/deleteAllNotVerifiedUsers.service';
import { UserRepository } from '@/modules/user/infrastructure/repositories/user.repository';

@Module({
    imports: [CqrsModule],
    providers: [
        UserRepository,
        CreateUserHandler,
        GetUserByEmailOrNullHandler,
        UpdateUserHandler,
        GetUserByIdOrNullHandler,
        IsUserExistsByEmailHandler,
        DeleteAllNotVerifiedUsersService,
        DeleteAllNotVerifiedUsersHandler,
    ],
})
export class UserModule {}
