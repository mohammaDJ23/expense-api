import { relations } from 'drizzle-orm';
import { uuid, pgTable, timestamp, varchar, index } from 'drizzle-orm/pg-core';

import { users } from '@/modules/user/infrastructure/schemas/user.schema';

import { localAccounts } from './localAccount.schema';
import { oauthAccounts } from './oauthAccount.schema';

export const emailIdentities = pgTable(
    'email_identities',
    {
        id: uuid('id').primaryKey().defaultRandom().notNull(),
        email: varchar('email', { length: 150 }).notNull().unique(),
        userId: uuid('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
            .notNull()
            .defaultNow(),
        updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
            .notNull()
            .defaultNow(),
    },
    (table) => [index('idx_email_identities_user_id').on(table.userId)],
);

export const emailIdentRelations = relations(emailIdentities, ({ one, many }) => ({
    user: one(users, {
        fields: [emailIdentities.userId],
        references: [users.id],
    }),
    localAccounts: one(localAccounts),
    oauthAccounts: many(oauthAccounts),
}));

type TSelectEmailIdentity = typeof emailIdentities.$inferSelect;
type TInsertEmailIdentity = typeof emailIdentities.$inferInsert;

export interface ISelectEmailIdentity extends TSelectEmailIdentity {}
export interface IInsertEmailIdentity extends TInsertEmailIdentity {}
