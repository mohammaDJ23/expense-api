import { Injectable } from '@nestjs/common';
import { and, eq, exists, sql } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import {
    toEntityOrNull,
    toEntityOrThrow,
} from '@/infrastructure/database/drizzle/drizzle.transformer';
import {
    receivers,
    type TInsertReceiver,
    type TSelectReceiver,
} from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import { usersReceivers } from '@/modules/receiver/infrastructure/schemas/userReceiver.schema';

import type { IReceiverRepository } from '@/modules/receiver/domain/interfaces/receiverRepository.interface';

@Injectable()
export class ReceiverRepository extends DrizzleRepository implements IReceiverRepository {
    create(data: TInsertReceiver): Promise<TSelectReceiver> {
        return toEntityOrThrow(
            this.db.insert(receivers).values(data).returning().prepare('create_receiver').execute(),
            'Unable to create',
        );
    }

    getByNameOrNull(name: string): Promise<TSelectReceiver | null> {
        return toEntityOrNull(
            this.db
                .select()
                .from(receivers)
                .where(eq(receivers.name, sql.placeholder('name')))
                .prepare('get_receiver_by_name')
                .execute({ name }),
        );
    }

    getByIdAndUserIdOrThrow(userId: string, receiverId: string): Promise<TSelectReceiver> {
        return toEntityOrThrow(
            this.db
                .select()
                .from(receivers)
                .where(
                    exists(
                        this.db
                            .select({ value: sql<number>`1` })
                            .from(usersReceivers)
                            .where(
                                and(
                                    eq(usersReceivers.userId, sql.placeholder('userId')),
                                    eq(usersReceivers.receiverId, sql.placeholder('receiverId')),
                                    eq(usersReceivers.receiverId, receivers.id),
                                ),
                            ),
                    ),
                )
                .prepare('get_receiver_by_id_and_user_id')
                .execute({ userId, receiverId }),
            'Unable to find',
        );
    }
}
