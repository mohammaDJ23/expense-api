import { relations } from 'drizzle-orm';
import { uuid, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

import { consumers } from '@/modules/consumers/infrastructure/schema/consumer.schema';
import { users } from '@/modules/user/infrastructure/schemas/user.schema';

export const bills = pgTable('bills', {
    id: uuid('id').primaryKey().defaultRandom(),
    amount: varchar('amount', { length: 12 }).notNull(),
    description: varchar('description', { length: 500 }).notNull(),
    purchasedAt: timestamp('purchased_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    userId: uuid('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    consumerId: uuid('consumer_id')
        .notNull()
        .references(() => consumers.id),
});

export const billsRelations = relations(bills, ({ one }) => ({
    user: one(users, {
        fields: [bills.userId],
        references: [users.id],
    }),
    consumer: one(consumers, {
        fields: [bills.consumerId],
        references: [consumers.id],
    }),
}));

export type TSelectBill = typeof bills.$inferSelect;
export type TInsertBill = typeof bills.$inferInsert;
