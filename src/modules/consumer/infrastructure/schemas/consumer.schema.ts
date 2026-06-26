import { relations } from 'drizzle-orm';
import { index, pgTable, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';

import { billsConsumers } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';
import { users } from '@/modules/user/infrastructure/schemas/user.schema';

export const consumers = pgTable(
    'consumers',
    {
        id: uuid('id').primaryKey().defaultRandom().notNull(),
        name: varchar('name', { length: 50 }).notNull(),
        createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
            .notNull()
            .defaultNow(),
        updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
            .notNull()
            .defaultNow(),
        userId: uuid('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
    },
    (table) => [
        uniqueIndex('uq_consumers_user_id_name').on(table.userId, table.name),
        index('idx_consumers_user_id_created_at').on(table.userId, table.createdAt),
    ],
);

export const consumersRelations = relations(consumers, ({ many, one }) => ({
    user: one(users, {
        fields: [consumers.userId],
        references: [users.id],
    }),
    billsConsumers: many(billsConsumers),
}));

type TSelectConsumer = typeof consumers.$inferSelect;
type TInsertConsumer = typeof consumers.$inferInsert;

export interface ISelectConsumer extends TSelectConsumer {}
export interface IInsertConsumer extends TInsertConsumer {}
