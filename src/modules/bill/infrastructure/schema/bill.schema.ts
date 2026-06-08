import { uuid, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const bills = pgTable('bills', {
    id: uuid('id').primaryKey().defaultRandom(),
    amount: varchar('amount', { length: 12 }).notNull(),
    description: varchar('description', { length: 500 }).notNull(),
    date: timestamp('date', { withTimezone: true }),
    createdAt: timestamp('date', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('date', { withTimezone: true }).notNull().defaultNow(),
});

export type TSelectBill = typeof bills.$inferSelect;
export type TInsertBill = typeof bills.$inferInsert;
