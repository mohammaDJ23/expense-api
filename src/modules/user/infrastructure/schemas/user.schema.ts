import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, pgEnum, varchar, index } from 'drizzle-orm/pg-core';

import { emailIdentities } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';
import { bills } from '@/modules/bill/infrastructure/schemas/bill.schema';
import { consumers } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import { locations } from '@/modules/location/infrastructure/schemas/location.schema';
import { receivers } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';

export const userRolesEnum = pgEnum('user_roles', UserRoles);

export const users = pgTable(
    'users',
    {
        id: uuid('id').primaryKey().defaultRandom().notNull(),
        role: userRolesEnum('role').notNull().default(UserRoles.USER),
        firstName: varchar('first_name', { length: 50 }),
        lastName: varchar('last_name', { length: 50 }),
        avatar: varchar('avatar', { length: 500 }),
        phone: varchar('phone', { length: 20 }),
        createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
            .notNull()
            .defaultNow(),
        updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
            .notNull()
            .defaultNow(),
    },
    (table) => [index('idx_users_created_at_id').on(table.createdAt, table.id)],
);

export const usersRelations = relations(users, ({ many }) => ({
    bills: many(bills),
    locations: many(locations),
    receivers: many(receivers),
    consumers: many(consumers),
    emailIdentities: many(emailIdentities),
}));

type TSelectUser = typeof users.$inferSelect;
type TInsertUser = typeof users.$inferInsert;

export interface ISelectUser extends TSelectUser {}
export interface IInsertUser extends TInsertUser {}
