import { Injectable } from '@nestjs/common';
import { and, desc, eq, getTableColumns, sql } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntities, toEntityOrThrow } from '@/infrastructure/database/drizzle/drizzle.transformer';
import {
    bills,
    type TInsertBill,
    type TSelectBill,
} from '@/modules/bill/infrastructure/schemas/bill.schema';
import { billsConsumers } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';
import {
    consumers,
    type TSelectConsumer,
} from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import {
    locations,
    type TSelectLocation,
} from '@/modules/location/infrastructure/schemas/location.schema';
import {
    receivers,
    type TSelectReceiver,
} from '@/modules/receiver/infrastructure/schemas/receiver.schema';

import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';
import type { IBillRepository } from '@/modules/bill/domain/interfaces/billRepository.interface';

@Injectable()
export class BillRepository extends DrizzleRepository implements IBillRepository {
    create(data: TInsertBill): Promise<TSelectBill> {
        return toEntityOrThrow(this.db.insert(bills).values(data).returning(), 'Unable to create');
    }

    getMany(userId: string, offset: number, limit: number): Promise<IBill[]> {
        return toEntities(
            this.db
                .select({
                    ...getTableColumns(bills),
                    location: sql<TSelectLocation>`
                    jsonb_build_object(
                        'id', ${locations.id},
                        'name', ${locations.name},
                        'createdAt', ${locations.createdAt},
                        'updatedAt', ${locations.updatedAt}
                    )
                `.as('location'),
                    receiver: sql<TSelectReceiver>`
                    jsonb_build_object(
                        'id', ${receivers.id},
                        'name', ${receivers.name},
                        'createdAt', ${receivers.createdAt},
                        'updatedAt', ${receivers.updatedAt}
                    )
                `.as('receiver'),
                    consumers: sql<TSelectConsumer[]>`
                    COALESCE(
                        jsonb_agg(
                            DISTINCT jsonb_build_object(
                                'id', ${consumers.id},
                                'name', ${consumers.name},
                                'createdAt', ${consumers.createdAt},
                                'updatedAt', ${consumers.updatedAt}
                            )
                        ) FILTER (WHERE ${consumers.id} IS NOT NULL),
                        '[]'::jsonb
                    )
                `.as('consumers'),
                })
                .from(bills)
                .leftJoin(locations, eq(bills.locationId, locations.id))
                .leftJoin(receivers, eq(bills.receiverId, receivers.id))
                .leftJoin(billsConsumers, eq(bills.id, billsConsumers.billId))
                .leftJoin(consumers, eq(billsConsumers.consumerId, consumers.id))
                .where(eq(bills.userId, sql.placeholder('userId')))
                .groupBy(bills.id, locations.id, receivers.id)
                .orderBy(desc(bills.createdAt))
                .limit(sql.placeholder('limit'))
                .offset(sql.placeholder('offset'))
                .prepare('get_many_bills')
                .execute({
                    limit,
                    offset,
                    userId,
                }),
        );
    }

    getByIdOrThrow(userId: string, billId: string): Promise<IBill> {
        return toEntityOrThrow(
            this.db
                .select({
                    ...getTableColumns(bills),
                    location: sql<TSelectLocation>`
                    jsonb_build_object(
                        'id', ${locations.id},
                        'name', ${locations.name},
                        'createdAt', ${locations.createdAt},
                        'updatedAt', ${locations.updatedAt}
                    )
                `.as('location'),
                    receiver: sql<TSelectReceiver>`
                    jsonb_build_object(
                        'id', ${receivers.id},
                        'name', ${receivers.name},
                        'createdAt', ${receivers.createdAt},
                        'updatedAt', ${receivers.updatedAt}
                    )
                `.as('receiver'),
                    consumers: sql<TSelectConsumer[]>`
                    COALESCE(
                        jsonb_agg(
                            DISTINCT jsonb_build_object(
                                'id', ${consumers.id},
                                'name', ${consumers.name},
                                'createdAt', ${consumers.createdAt},
                                'updatedAt', ${consumers.updatedAt}
                            )
                        ) FILTER (WHERE ${consumers.id} IS NOT NULL),
                        '[]'::jsonb
                    )
                `.as('consumers'),
                })
                .from(bills)
                .leftJoin(locations, eq(bills.locationId, locations.id))
                .leftJoin(receivers, eq(bills.receiverId, receivers.id))
                .leftJoin(billsConsumers, eq(bills.id, billsConsumers.billId))
                .leftJoin(consumers, eq(billsConsumers.consumerId, consumers.id))
                .where(
                    and(
                        eq(bills.id, sql.placeholder('billId')),
                        eq(bills.userId, sql.placeholder('userId')),
                    ),
                )
                .groupBy(bills.id, locations.id, receivers.id)
                .prepare('get_bill_by_id_or_throw')
                .execute({
                    userId,
                    billId,
                }),
            'Unable to find',
        );
    }
}
