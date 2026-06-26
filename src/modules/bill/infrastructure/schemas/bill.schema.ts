import { relations } from 'drizzle-orm';
import { uuid, pgTable, timestamp, varchar, index } from 'drizzle-orm/pg-core';

import { billsConsumers } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';
import { locations } from '@/modules/location/infrastructure/schemas/location.schema';
import { receivers } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import { users } from '@/modules/user/infrastructure/schemas/user.schema';

export const bills = pgTable(
    'bills',
    {
        id: uuid('id').primaryKey().defaultRandom().notNull(),
        amount: varchar('amount', { length: 12 }).notNull(),
        description: varchar('description', { length: 500 }).notNull(),
        purchasedAt: timestamp('purchased_at', { withTimezone: true, mode: 'string' }),
        createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
            .notNull()
            .defaultNow(),
        updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
            .notNull()
            .defaultNow(),
        userId: uuid('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        receiverId: uuid('receiver_id')
            .notNull()
            .references(() => receivers.id, { onDelete: 'restrict' }),
        locationId: uuid('location_id')
            .notNull()
            .references(() => locations.id, { onDelete: 'restrict' }),
    },
    (table) => [index('idx_bills_user_id_created_at').on(table.userId, table.createdAt)],
);

export const billsRelations = relations(bills, ({ one, many }) => ({
    user: one(users, {
        fields: [bills.userId],
        references: [users.id],
    }),
    receiver: one(receivers, {
        fields: [bills.receiverId],
        references: [receivers.id],
    }),
    location: one(locations, {
        fields: [bills.locationId],
        references: [locations.id],
    }),
    billsConsumers: many(billsConsumers),
}));

type TSelectBill = typeof bills.$inferSelect;
type TInsertBill = typeof bills.$inferInsert;

export interface ISelectBill extends TSelectBill {}
export interface IInsertBill extends TInsertBill {}
