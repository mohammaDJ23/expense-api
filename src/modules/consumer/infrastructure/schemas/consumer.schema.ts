import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { bills } from '@/modules/bill/infrastructure/schemas/bill.schema';

import { usersConsumers } from './usersConsumers.schema';

export const consumers = pgTable('consumers', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    name: varchar('name', { length: 50 }).notNull().unique(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const consumersRelations = relations(consumers, ({ many }) => ({
    bills: many(bills),
    usersConsumers: many(usersConsumers),
}));

export type TSelectConsumer = typeof consumers.$inferSelect;
export type TInsertConsumer = typeof consumers.$inferInsert;
