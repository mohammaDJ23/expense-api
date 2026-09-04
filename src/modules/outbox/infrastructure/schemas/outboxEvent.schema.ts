import { jsonb, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';
import type { TOutboxEventPayload } from '@/modules/outbox/domain/types/outboxEventPayload.type';
import type { TOutboxEventType } from '@/modules/outbox/domain/types/outboxEventType.type';

export const outboxEvents = pgTable('outbox_events', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    aggregateType: varchar('aggregate_type', { length: 100 })
        .notNull()
        .$type<TOutboxEventAggregateType>(),
    aggregateId: uuid('aggregate_id').notNull(),
    eventType: varchar('event_type', { length: 150 }).notNull().$type<TOutboxEventType>(),
    payload: jsonb('payload').notNull().$type<TOutboxEventPayload>(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).notNull(),
});

type TSelectOutboxEvent = typeof outboxEvents.$inferSelect;
type TInsertOutboxEvent = typeof outboxEvents.$inferInsert;

export interface ISelectOutboxEvent<T = TOutboxEventPayload> extends Omit<
    TSelectOutboxEvent,
    'payload'
> {
    payload: T;
}

export interface IInsertOutboxEvent<T = TOutboxEventPayload> extends Omit<
    TInsertOutboxEvent,
    'payload'
> {
    payload: T;
}
