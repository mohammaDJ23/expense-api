import { relations } from 'drizzle-orm';
import { index, pgTable, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';

import { bills } from '@/modules/bill/infrastructure/schemas/bill.schema';
import { users } from '@/modules/user/infrastructure/schemas/user.schema';

export const receivers = pgTable(
    'receivers',
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
        uniqueIndex('uq_receivers_user_id_name').on(table.userId, table.name),
        index('idx_receivers_user_id_id').on(table.userId, table.id),
        index('idx_receivers_user_id_created_at_id').on(table.userId, table.createdAt, table.id),
    ],
);

export const receiversRelations = relations(receivers, ({ many, one }) => ({
    user: one(users, {
        fields: [receivers.userId],
        references: [users.id],
    }),
    bills: many(bills),
}));

type TSelectReceiver = typeof receivers.$inferSelect;
type TInsertReceiver = typeof receivers.$inferInsert;

export interface ISelectReceiver extends TSelectReceiver {}
export interface IInsertReceiver extends TInsertReceiver {}
