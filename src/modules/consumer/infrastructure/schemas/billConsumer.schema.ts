import { relations } from 'drizzle-orm';
import { index, pgTable, primaryKey, timestamp, uuid } from 'drizzle-orm/pg-core';

import { bills } from '@/modules/bill/infrastructure/schemas/bill.schema';

import { consumers } from './consumer.schema';

export const billsConsumers = pgTable(
    'bills_consumers',
    {
        createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
            .notNull()
            .defaultNow(),
        billId: uuid('bill_id')
            .notNull()
            .references(() => bills.id, { onDelete: 'cascade' }),
        consumerId: uuid('consumer_id')
            .notNull()
            .references(() => consumers.id, { onDelete: 'restrict' }),
    },
    (table) => [
        primaryKey({ columns: [table.billId, table.consumerId] }),
        index('idx_bills_consumers_bill_id').on(table.billId),
        index('idx_bills_consumers_consumer_id').on(table.consumerId),
    ],
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

type TSelectBillConsumer = typeof billsConsumers.$inferSelect;
type TInsertBillConsumer = typeof billsConsumers.$inferInsert;

export interface ISelectBillConsumer extends TSelectBillConsumer {}
export interface IInsertBillConsumer extends TInsertBillConsumer {}
