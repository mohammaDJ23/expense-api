import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ProjectionService } from '@/core/services/projection.service';
import { CreateUserCommand } from '@/modules/user/applications/commands/createUser/createUser.command';
import { UserCacheInvalidatorService } from '@/modules/user/infrastructure/cache/userCacheInvalidator.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { TCreateUser } from '@/modules/user/domain/types/createUser.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class CreateUserService implements IService<TCreateUser, ISelectUser> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly userCacheInvalidatorService: UserCacheInvalidatorService,
        private readonly projectionService: ProjectionService,
    ) {}

    async execute(input: TCreateUser): Promise<ISelectUser> {
        const createdUser = await this.create(input);

        await this.projectionService.execute([this.userCacheInvalidatorService.execute()]);

        return createdUser;
    }

    create(input: TCreateUser): Promise<ISelectUser> {
        return this.commandBus.execute<CreateUserCommand, ISelectUser>(
            new CreateUserCommand(input),
        );
    }
}
