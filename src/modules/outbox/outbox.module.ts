import { Module } from '@nestjs/common';

import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateOutboxEventHandler } from '@/modules/outbox/applications/commands/createOutboxEvent/createOutboxEvent.handler';
import { DeleteManyOutboxEventsByDateHandler } from '@/modules/outbox/applications/commands/deleteManyOutboxEventsByDate/deleteManyOutboxEventsByDate.handler';
import { DeleteManyOutboxEventsJob } from '@/modules/outbox/applications/services/jobs/deleteManyOutboxEvents.job';
import { OutboxEventPublisherService } from '@/modules/outbox/applications/services/outboxEventPublisher.service';
import { OutboxEventRepository } from '@/modules/outbox/infrastructure/repositories/outboxEvent.repository';

@Module({
    imports: [CqrsModule],
    providers: [
        DeleteManyOutboxEventsJob,
        CreateOutboxEventHandler,
        DeleteManyOutboxEventsByDateHandler,
        OutboxEventRepository,
        OutboxEventPublisherService,
    ],
    exports: [OutboxEventPublisherService],
})
export class OutboxModule {}
