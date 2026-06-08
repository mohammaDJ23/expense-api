import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

import { users } from '@/modules/user/infrastructure/schemas/user.schema';

import { receivers } from './receiver.schema';

export const usersReceivers = pgTable('users_receivers', {
    id: uuid('id').primaryKey().defaultRandom(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    userId: uuid('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    receiverId: uuid('receiver_id')
        .notNull()
        .references(() => receivers.id, { onDelete: 'cascade' }),
});

export const uniqueUsersReceivers = uniqueIndex('unique_users_receivers').on(
    usersReceivers.userId,
    usersReceivers.receiverId,
);

export const usersReceiversRelations = relations(usersReceivers, ({ one }) => ({
    user: one(users, {
        fields: [usersReceivers.userId],
        references: [users.id],
    }),
    receiver: one(receivers, {
        fields: [usersReceivers.receiverId],
        references: [receivers.id],
    }),
}));
