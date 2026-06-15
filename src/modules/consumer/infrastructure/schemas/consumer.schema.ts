import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { billsConsumers } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';

import { usersConsumers } from './userConsumer.schema';

export const consumers = pgTable('consumers', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    name: varchar('name', { length: 50 }).notNull().unique(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
        .notNull()
        .defaultNow(),
});

export const consumersRelations = relations(consumers, ({ many }) => ({
    billsConsumers: many(billsConsumers),
    usersConsumers: many(usersConsumers),
}));

export type TSelectConsumer = typeof consumers.$inferSelect;
export type TInsertConsumer = typeof consumers.$inferInsert;
