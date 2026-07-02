import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { OutboxEventRepository } from '@/modules/outbox/infrastructure/repositories/outboxEvent.repository';

import { DeleteManyOutboxEventsByDateCommand } from './deleteManyOutboxEventsByDate.command';

import type { ISelectOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

@CommandHandler(DeleteManyOutboxEventsByDateCommand)
export class DeleteManyOutboxEventsByDateHandler implements ICommandHandler<
    DeleteManyOutboxEventsByDateCommand,
    ISelectOutboxEvent[]
> {
    constructor(private readonly outboxEventRepository: OutboxEventRepository) {}

    async execute(command: DeleteManyOutboxEventsByDateCommand): Promise<ISelectOutboxEvent[]> {
        try {
            return await this.outboxEventRepository.deleteManyByDate(command.props.date);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
