import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Cron, CronExpression } from '@nestjs/schedule';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { DeleteManyOutboxEventsByDateCommand } from '@/modules/outbox/applications/commands/deleteManyOutboxEventsByDate/deleteManyOutboxEventsByDate.command';

import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectOutboxEvent } from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

@Injectable()
export class DeleteManyOutboxEventsService implements IService<void, void> {
    constructor(private readonly commandBus: CommandBus) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async execute(): Promise<void> {
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - 7);

        await this.commandBus.execute<DeleteManyOutboxEventsByDateCommand, ISelectOutboxEvent[]>(
            new DeleteManyOutboxEventsByDateCommand({
                date: getCurrentUTCTimestamp(cutoff),
            }),
        );
    }
}
