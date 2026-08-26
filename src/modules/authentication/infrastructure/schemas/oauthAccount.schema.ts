import { relations } from 'drizzle-orm';
import { uuid, pgTable, timestamp, pgEnum, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

import { OauthProvider } from '@/modules/authentication/domain/enums/oauthProvider.enum';

import { emailIdentities } from './emailIdentity.schema';

export const oauthProviderEnum = pgEnum('oauth_provider', OauthProvider);

export const oauthAccounts = pgTable(
    'oauth_accounts',
    {
        id: uuid('id').primaryKey().defaultRandom().notNull(),
        provider: oauthProviderEnum('provider').notNull(),
        providerId: varchar('provider_id', { length: 255 }).notNull(),
        emailId: uuid('email_id')
            .notNull()
            .references(() => emailIdentities.id, { onDelete: 'cascade' }),
        lastLoginAt: timestamp('last_login_at', { withTimezone: true, mode: 'string' }),
        verifiedAt: timestamp('verified_at', { withTimezone: true, mode: 'string' }),
        createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
            .notNull()
            .defaultNow(),
        updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
            .notNull()
            .defaultNow(),
    },
    (table) => [
        uniqueIndex('uq_oauth_accounts_provider_provider_id').on(table.provider, table.providerId),
        uniqueIndex('uq_oauth_accounts_email_id_provider').on(table.emailId, table.provider),
    ],
);

export const oauthAccountsRelations = relations(oauthAccounts, ({ one }) => ({
    email: one(emailIdentities, {
        fields: [oauthAccounts.emailId],
        references: [emailIdentities.id],
    }),
}));

type TSelectOauthAccount = typeof oauthAccounts.$inferSelect;
type TInsertOauthAccount = typeof oauthAccounts.$inferInsert;

export interface ISelectOauthAccount extends TSelectOauthAccount {}
export interface IInsertOauthAccount extends TInsertOauthAccount {}
