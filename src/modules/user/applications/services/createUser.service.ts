import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';
import { CreateUserCommand } from '@/modules/user/applications/commands/createUser/createUser.command';
import { UserResource } from '@/modules/user/domain/enums/user.enum';
import { UserMessageEvent } from '@/modules/user/domain/enums/userMessageEvent.enum';

import type { IService } from '@/core/interfaces/service.interface';
import type { TCreateUser } from '@/modules/user/domain/types/createUser.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class CreateUserService implements IService<TCreateUser, ISelectUser> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly outboxEventPublisherService: OutboxEventPublisherService,
    ) {}

    @Transactional()
    async execute(input: TCreateUser): Promise<ISelectUser> {
        const createdUser = await this.commandBus.execute<CreateUserCommand, ISelectUser>(
            new CreateUserCommand(input),
        );

        await this.outboxEventPublisherService.publish({
            aggregateId: createdUser.id,
            aggregateType: UserResource.USER,
            eventType: UserMessageEvent.CREATED_USER,
            payload: createdUser,
            createdAt: input.createdAt,
        });

        return createdUser;
    }
}
