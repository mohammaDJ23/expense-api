import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, pgEnum, varchar } from 'drizzle-orm/pg-core';

import { bills } from '@/modules/bill/infrastructure/schemas/bill.schema';
import { usersConsumers } from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';
import { usersLocations } from '@/modules/location/infrastructure/schemas/userLocation.schema';
import { usersReceivers } from '@/modules/receiver/infrastructure/schemas/userReceiver.schema';
import { AuthProvider } from '@/modules/user/domain/enums/authProvider.enum';
import { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';

export const userRolesEnum = pgEnum('user_roles', UserRoles);
export const authProviderEnum = pgEnum('auth_provider', AuthProvider);

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    email: varchar('email', { length: 150 }).notNull().unique(),
    role: userRolesEnum('role').notNull().default(UserRoles.USER),
    firstName: varchar('first_name', { length: 50 }),
    lastName: varchar('last_name', { length: 50 }),
    avatar: varchar('avatar', { length: 500 }),
    phone: varchar('phone', { length: 20 }),
    hashedPassword: varchar('hashed_password', { length: 255 }),
    googleId: varchar('google_id', { length: 255 }).unique(),
    authProvider: authProviderEnum('auth_provider').notNull().default(AuthProvider.LOCAL),
    verifiedAt: timestamp('verified_at', { withTimezone: true, mode: 'string' }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
        .notNull()
        .defaultNow(),
    lastLoginAt: timestamp('last_login_at', { withTimezone: true, mode: 'string' }),
});

export const usersRelations = relations(users, ({ many }) => ({
    bills: many(bills),
    usersConsumers: many(usersConsumers),
    usersReceivers: many(usersReceivers),
    usersLocations: many(usersLocations),
}));

export type TSelectUser = typeof users.$inferSelect;
export type TInsertUser = typeof users.$inferInsert;
