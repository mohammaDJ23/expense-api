import { relations } from 'drizzle-orm';
import { index, pgTable, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core';

import { users } from '@/modules/user/infrastructure/schemas/user.schema';

import { locations } from './location.schema';

export const usersLocations = pgTable(
    'users_locations',
    {
        id: uuid('id').primaryKey().defaultRandom().notNull(),
        createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
            .notNull()
            .defaultNow(),
        userId: uuid('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        locationId: uuid('location_id')
            .notNull()
            .references(() => locations.id, { onDelete: 'restrict' }),
    },
    (table) => [
        uniqueIndex('uq_users_locations_user_id_location_id').on(table.userId, table.locationId),
        index('idx_users_locations_user_id_created_at').on(table.userId, table.createdAt),
    ],
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

type TSelectUserLocation = typeof usersLocations.$inferSelect;
type TInsertUserLocation = typeof usersLocations.$inferInsert;

export interface ISelectUserLocation extends TSelectUserLocation {}
export interface IInsertUserLocation extends TInsertUserLocation {}
