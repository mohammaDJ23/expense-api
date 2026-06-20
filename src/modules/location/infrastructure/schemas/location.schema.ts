import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { bills } from '@/modules/bill/infrastructure/schemas/bill.schema';

import { usersLocations } from './userLocation.schema';

export const locations = pgTable('locations', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    name: varchar('name', { length: 50 }).notNull().unique(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
        .notNull()
        .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
        .notNull()
        .defaultNow(),
});

export const locationsRelations = relations(locations, ({ many }) => ({
    bills: many(bills),
    usersLocations: many(usersLocations),
}));

type TSelectLocation = typeof locations.$inferSelect;
type TInsertLocation = typeof locations.$inferInsert;

export interface ISelectLocation extends TSelectLocation {}
export interface IInsertLocation extends TInsertLocation {}
