import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { bills } from '@/modules/bill/infrastructure/schemas/bill.schema';

import { usersReceivers } from './userReceiver.schema';

export const receivers = pgTable('receivers', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    name: varchar('name', { length: 50 }).notNull().unique(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
        .notNull()
        .defaultNow(),
});

export const receiversRelations = relations(receivers, ({ many }) => ({
    bills: many(bills),
    usersReceivers: many(usersReceivers),
}));

type TSelectReceiver = typeof receivers.$inferSelect;
type TInsertReceiver = typeof receivers.$inferInsert;

export interface ISelectReceiver extends TSelectReceiver {}
export interface IInsertReceiver extends TInsertReceiver {}
