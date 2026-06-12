import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

import { bills } from '@/modules/bill/infrastructure/schemas/bill.schema';

import { consumers } from './consumer.schema';

export const billsConsumers = pgTable(
    'bills_consumers',
    {
        id: uuid('id').primaryKey().defaultRandom().notNull(),
        createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
        billId: uuid('bill_id')
            .notNull()
            .references(() => bills.id, { onDelete: 'cascade' }),
        consumerId: uuid('consumer_id')
            .notNull()
            .references(() => consumers.id, { onDelete: 'restrict' }),
    },
    (table) => [uniqueIndex('unique_bills_consumers').on(table.billId, table.consumerId)],
);

export const billsConsumersRelations = relations(billsConsumers, ({ one }) => ({
    bill: one(bills, {
        fields: [billsConsumers.billId],
        references: [bills.id],
    }),
    consumer: one(consumers, {
        fields: [billsConsumers.consumerId],
        references: [consumers.id],
    }),
}));

export type TSelectBillConsumer = typeof billsConsumers.$inferSelect;
export type TInsertBillConsumer = typeof billsConsumers.$inferInsert;
