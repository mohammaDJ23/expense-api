import { relations } from 'drizzle-orm';
import { uuid, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

import { consumers } from '@/modules/consumers/infrastructure/schemas/consumer.schema';
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
    consumerId: uuid('consumer_id')
        .notNull()
        .references(() => consumers.id),
    receiverId: uuid('receiver_id')
        .notNull()
        .references(() => receivers.id),
    locationId: uuid('location_id')
        .notNull()
        .references(() => locations.id),
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
    receiver: one(receivers, {
        fields: [bills.receiverId],
        references: [receivers.id],
    }),
    location: one(locations, {
        fields: [bills.locationId],
        references: [locations.id],
    }),
}));

export type TSelectBill = typeof bills.$inferSelect;
export type TInsertBill = typeof bills.$inferInsert;
