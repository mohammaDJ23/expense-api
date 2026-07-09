import { sql } from 'drizzle-orm';
import { jsonb, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import type { TOutboxEventPayload } from '@/modules/outbox/domain/interfaces/outboxEventPayload.interface';

export const outboxEvents = pgTable('outbox_events', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    aggregateType: varchar('aggregate_type', { length: 100 }).notNull(),
    aggregateId: uuid('aggregate_id').notNull(),
    eventType: varchar('event_type', { length: 150 }).notNull(),
    route: varchar('route', { length: 255 })
        .notNull()
        .generatedAlwaysAs(
            () => sql`${outboxEvents.aggregateType} || '.' || ${outboxEvents.eventType}`,
        ),
    payload: jsonb('payload').$type<TOutboxEventPayload>().notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).notNull(),
});

type TSelectOutboxEvent = typeof outboxEvents.$inferSelect;
type TInsertOutboxEvent = typeof outboxEvents.$inferInsert;

export interface ISelectOutboxEvent<
    T extends TOutboxEventPayload = TOutboxEventPayload,
> extends Omit<TSelectOutboxEvent, 'payload'> {
    payload: T;
}

export interface IInsertOutboxEvent<
    T extends TOutboxEventPayload = TOutboxEventPayload,
> extends Omit<TInsertOutboxEvent, 'payload'> {
    payload: T;
}
