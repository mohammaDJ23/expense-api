import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

import { users } from '@/modules/user/infrastructure/schemas/user.schema';

import { consumers } from './consumer.schema';

export const usersConsumers = pgTable('users_consumers', {
    id: uuid('id').primaryKey().defaultRandom(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    userId: uuid('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    consumerId: uuid('consumer_id')
        .notNull()
        .references(() => consumers.id, { onDelete: 'cascade' }),
});

export const uniqueUsersConsumers = uniqueIndex('unique_users_consumers').on(
    usersConsumers.userId,
    usersConsumers.consumerId,
);

export const usersConsumersRelations = relations(usersConsumers, ({ one }) => ({
    user: one(users, {
        fields: [usersConsumers.userId],
        references: [users.id],
    }),
    consumer: one(consumers, {
        fields: [usersConsumers.consumerId],
        references: [consumers.id],
    }),
}));
