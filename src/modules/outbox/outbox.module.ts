import { Module } from '@nestjs/common';

import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateOutboxEventHandler } from '@/modules/outbox/applications/commands/createOutboxEvent/createOutboxEvent.handler';
import { DeleteManyOutboxEventsByDateHandler } from '@/modules/outbox/applications/commands/deleteManyOutboxEventsByDate/deleteManyOutboxEventsByDate.handler';
import { DeleteManyOutboxEventsService } from '@/modules/outbox/applications/services/deleteManyOutboxEvents.service';
import { OutboxEventRepository } from '@/modules/outbox/infrastructure/repositories/outboxEvent.repository';

@Module({
    imports: [CqrsModule],
    providers: [
        DeleteManyOutboxEventsService,
        CreateOutboxEventHandler,
        DeleteManyOutboxEventsByDateHandler,
        OutboxEventRepository,
    ],
})
export class OutboxModule {}
