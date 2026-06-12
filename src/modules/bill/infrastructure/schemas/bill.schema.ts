import { relations } from 'drizzle-orm';
import { uuid, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

import { billsConsumers } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';
import { locations } from '@/modules/location/infrastructure/schemas/location.schema';
import { receivers } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import { users } from '@/modules/user/infrastructure/schemas/user.schema';

export const bills = pgTable('bills', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    amount: varchar('amount', { length: 12 }).notNull(),
    description: varchar('description', { length: 500 }).notNull(),
    purchasedAt: timestamp('purchased_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
    userId: uuid('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    receiverId: uuid('receiver_id')
        .notNull()
        .references(() => receivers.id),
    locationId: uuid('location_id')
        .notNull()
        .references(() => locations.id),
});

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

export type TSelectBill = typeof bills.$inferSelect;
export type TInsertBill = typeof bills.$inferInsert;
