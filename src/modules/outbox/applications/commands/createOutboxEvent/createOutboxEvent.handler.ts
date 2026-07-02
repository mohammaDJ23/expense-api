import { NotFoundException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { OutboxEventRepository } from '@/modules/outbox/infrastructure/repositories/outboxEvent.repository';

import { CreateOutboxEventCommand } from './createOutboxEvent.command';

import type { ISelectOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

@CommandHandler(CreateOutboxEventCommand)
export class CreateOutboxEventHandler implements ICommandHandler<
    CreateOutboxEventCommand,
    ISelectOutboxEvent
> {
    constructor(private readonly outboxEventRepository: OutboxEventRepository) {}

    async execute(command: CreateOutboxEventCommand): Promise<ISelectOutboxEvent> {
        try {
            return await this.outboxEventRepository.create(command.props);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
