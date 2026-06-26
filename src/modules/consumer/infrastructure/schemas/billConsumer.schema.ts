import { relations } from 'drizzle-orm';
import { index, pgTable, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

import { bills } from '@/modules/bill/infrastructure/schemas/bill.schema';

import { consumers } from './consumer.schema';

export const billsConsumers = pgTable(
    'bills_consumers',
    {
        id: uuid('id').primaryKey().defaultRandom().notNull(),
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
        uniqueIndex('uq_bills_consumers_bill_id_consumer_id').on(table.billId, table.consumerId),
        index('idx_bills_consumers_bill_id_created_at').on(table.billId, table.createdAt),
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
