import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ProjectionService } from '@/core/services/projection.service';
import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';
import { UserExistenceValidatorService } from '@/modules/user/applications/services/validators/userExistenceValidator.service';
import { UserCacheInvalidatorService } from '@/modules/user/infrastructure/cache/userCacheInvalidator.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { TUpdateUser } from '@/modules/user/domain/types/updateUser.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class UpdateUserService implements IService<TUpdateUser, ISelectUser> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly userExistenceValidatorService: UserExistenceValidatorService,
        private readonly userCacheInvalidatorService: UserCacheInvalidatorService,
        private readonly projectionService: ProjectionService,
    ) {}

    async execute(input: TUpdateUser): Promise<ISelectUser> {
        const updatedUser = await this.update(input);

        await this.projectionService.execute([this.userCacheInvalidatorService.execute()]);

        return updatedUser;
    }

    async update(input: TUpdateUser): Promise<ISelectUser> {
        await this.userExistenceValidatorService.validate({ userId: input.id });

        return this.commandBus.execute<UpdateUserCommand, ISelectUser>(
            new UpdateUserCommand(input),
        );
    }
}
