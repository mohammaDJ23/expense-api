import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';
import { DeleteUserCommand } from '@/modules/user/applications/commands/deleteUser/deleteUser.command';
import { UserExistenceValidatorService } from '@/modules/user/applications/services/validators/userExistenceValidator.service';
import { UserResource } from '@/modules/user/user.enum';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

interface IInput {
    userId: string;
}

@Injectable()
export class DeleteUserService implements IService<IInput, IId> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly userExistenceValidatorService: UserExistenceValidatorService,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
    ) {}

    @Transactional()
    async execute(input: IInput): Promise<IId> {
        await this.userExistenceValidatorService.validate({ userId: input.userId });

        const deletedUser = await this.commandBus.execute<DeleteUserCommand, ISelectUser>(
            new DeleteUserCommand({
                userId: input.userId,
            }),
        );

        await this.outboxEventPublisherService.publish({
            aggregateId: deletedUser.id,
            aggregateType: UserResource.USER,
            eventType: 'deleted',
            payload: deletedUser,
            createdAt: getCurrentUTCTimestamp(),
        });

        return {
            id: deletedUser.id,
        };
    }
}
