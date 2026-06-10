import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { bills } from '@/modules/bill/infrastructure/schemas/bill.schema';

import { usersReceivers } from './usersReceivers.schema';

export const receivers = pgTable('receivers', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    name: varchar('name', { length: 50 }).notNull().unique(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const receiversRelations = relations(receivers, ({ many }) => ({
    bills: many(bills),
    usersReceivers: many(usersReceivers),
}));

export type TSelectReceiver = typeof receivers.$inferSelect;
export type TInsertReceiver = typeof receivers.$inferInsert;
