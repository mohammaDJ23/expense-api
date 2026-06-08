import { relations } from 'drizzle-orm';
import { uuid, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

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
});

export const billsRelations = relations(bills, ({ one }) => ({
    user: one(users, {
        fields: [bills.userId],
        references: [users.id],
    }),
}));

export type TSelectBill = typeof bills.$inferSelect;
export type TInsertBill = typeof bills.$inferInsert;
