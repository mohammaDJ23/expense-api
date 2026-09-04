import { relations } from 'drizzle-orm';
import { uuid, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

import { emailIdentities } from './emailIdentity.schema';

export const localAccounts = pgTable('local_accounts', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    hashedPassword: varchar('hashed_password', { length: 255 }).notNull(),
    emailId: uuid('email_id')
        .unique()
        .notNull()
        .references(() => emailIdentities.id, { onDelete: 'cascade' }),
    lastLoginAt: timestamp('last_login_at', { withTimezone: true, mode: 'string' }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
        .notNull()
        .defaultNow(),
});

export const localAccountsRelations = relations(localAccounts, ({ one }) => ({
    email: one(emailIdentities, {
        fields: [localAccounts.emailId],
        references: [emailIdentities.id],
    }),
}));

type TSelectLocalAccount = typeof localAccounts.$inferSelect;
type TInsertLocalAccount = typeof localAccounts.$inferInsert;

export interface ISelectLocalAccount extends TSelectLocalAccount {}
export interface IInsertLocalAccount extends TInsertLocalAccount {}
