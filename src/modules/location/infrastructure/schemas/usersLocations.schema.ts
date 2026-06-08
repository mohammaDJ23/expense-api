import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

import { users } from '@/modules/user/infrastructure/schemas/user.schema';

import { locations } from './location.schema';

export const usersLocations = pgTable('users_locations', {
    id: uuid('id').primaryKey().defaultRandom(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    userId: uuid('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    locationId: uuid('location_id')
        .notNull()
        .references(() => locations.id, { onDelete: 'cascade' }),
});

export const uniqueUsersLocations = uniqueIndex('unique_users_locations').on(
    usersLocations.userId,
    usersLocations.locationId,
);

export const usersLocationsRelations = relations(usersLocations, ({ one }) => ({
    user: one(users, {
        fields: [usersLocations.userId],
        references: [users.id],
    }),
    location: one(locations, {
        fields: [usersLocations.locationId],
        references: [locations.id],
    }),
}));
