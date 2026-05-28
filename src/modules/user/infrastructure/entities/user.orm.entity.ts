import { pgTable, timestamp, uuid, pgEnum, varchar } from 'drizzle-orm/pg-core';

import { UserRoles } from '@/modules/user/domain/enums/userRoles.enum';

export const userRolesEnum = pgEnum('user_roles', UserRoles);

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 150 }).notNull().unique(),
    role: userRolesEnum('role').notNull().default(UserRoles.USER),
    firstName: varchar('first_name', { length: 50 }),
    lastName: varchar('last_name', { length: 50 }),
    avatar: varchar('avatar', { length: 500 }),
    phone: varchar('phone', { length: 20 }),
    hashedPassword: varchar('hashed_password', { length: 255 }).notNull(),
    verifiedAt: timestamp('verified_at', { withTimezone: true }),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }),
    lastLoginAt: timestamp('last_login_at', { withTimezone: true }),
});

export type TUser = typeof users.$inferSelect;
export type TNewUser = typeof users.$inferInsert;
