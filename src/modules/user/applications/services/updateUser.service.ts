import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';
import { UpdateUserCommand } from '@/modules/user/applications/commands/updateUser/updateUser.command';
import { UserExistenceValidatorService } from '@/modules/user/applications/services/validators/userExistenceValidator.service';
import { UserResource } from '@/modules/user/user.enum';

import type { IService } from '@/core/interfaces/service.interface';
import type { TUpdateUser } from '@/modules/user/domain/types/updateUser.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class UpdateUserService implements IService<TUpdateUser, ISelectUser> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly userExistenceValidatorService: UserExistenceValidatorService,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
    ) {}

    @Transactional()
    async execute(input: TUpdateUser): Promise<ISelectUser> {
        await this.userExistenceValidatorService.validate({ userId: input.id });

        const updatedUser = await this.commandBus.execute<UpdateUserCommand, ISelectUser>(
            new UpdateUserCommand(input),
        );

        await this.outboxEventPublisherService.publish({
            aggregateId: updatedUser.id,
            aggregateType: UserResource.USER,
            eventType: 'updated',
            payload: updatedUser,
            createdAt: getCurrentUTCTimestamp(),
        });

        return updatedUser;
    }
}
