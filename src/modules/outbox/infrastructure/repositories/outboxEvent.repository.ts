import { Injectable } from '@nestjs/common';
import { lt } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntities } from '@/infrastructure/database/drizzle/transformers/toEntities.transformer';
import { toEntityOrThrow } from '@/infrastructure/database/drizzle/transformers/toEntityOrThrow.transformer';
import {
    outboxEvents,
    type IInsertOutboxEvent,
    type ISelectOutboxEvent,
} from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

import type { IOutboxEventRepository } from '@/modules/outbox/domain/interfaces/outboxEventRepository.interface';

@Injectable()
export class OutboxEventRepository implements IOutboxEventRepository {
    constructor(private readonly drizzleRepository: DrizzleRepository) {}

    create(data: IInsertOutboxEvent): Promise<ISelectOutboxEvent> {
        return toEntityOrThrow(
            // @ts-expect-error: since drizzle has a bug around generatedAlwaysAs function for now i will ignore the type checking here
            this.drizzleRepository.db.insert(outboxEvents).values(data).returning().execute(),
            'Unable to create an event',
        );
    }

    deleteManyByDate(date: string): Promise<ISelectOutboxEvent[]> {
        return toEntities(
            // @ts-expect-error: since drizzle has a bug around generatedAlwaysAs function for now i will ignore the type checking here
            this.drizzleRepository.db
                .delete(outboxEvents)
                .where(lt(outboxEvents.createdAt, date))
                .returning()
                .execute(),
        );
    }
}
