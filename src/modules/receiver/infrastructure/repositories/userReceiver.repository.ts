import { Injectable } from '@nestjs/common';
import { and, eq, inArray, sql } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import {
    toEntities,
    toEntityOrNull,
    toEntityOrThrow,
} from '@/infrastructure/database/drizzle/drizzle.transformer';
import {
    receivers,
    type TSelectReceiver,
} from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import {
    usersReceivers,
    type TInsertUserReceiver,
    type TSelectUserReceiver,
} from '@/modules/receiver/infrastructure/schemas/userReceiver.schema';

import type { IUserReceiverRepository } from '@/modules/receiver/domain/interfaces/userReceiverRepository.interface';

@Injectable()
export class UserReceiverRepository extends DrizzleRepository implements IUserReceiverRepository {
    create(data: TInsertUserReceiver): Promise<TSelectUserReceiver> {
        return toEntityOrThrow(
            this.db
                .insert(usersReceivers)
                .values(data)
                .returning()
                .prepare('create_user_receiver')
                .execute(),
            'Unable to create',
        );
    }

    getByIdOrNull(userId: string, receiverId: string): Promise<TSelectUserReceiver | null> {
        return toEntityOrNull(
            this.db
                .select()
                .from(usersReceivers)
                .where(
                    and(
                        eq(usersReceivers.userId, sql.placeholder('userId')),
                        eq(usersReceivers.receiverId, sql.placeholder('receiverId')),
                    ),
                )
                .prepare('get_user_receiver_by_id')
                .execute({ userId, receiverId }),
        );
    }

    getJoinedByIdOThrow(userId: string, receiverId: string): Promise<TSelectReceiver> {
        return toEntityOrThrow(
            this.db
                .select({
                    id: receivers.id,
                    name: receivers.name,
                    createdAt: receivers.createdAt,
                    updatedAt: receivers.updatedAt,
                })
                .from(usersReceivers)
                .innerJoin(receivers, eq(usersReceivers.receiverId, receivers.id))
                .where(
                    and(
                        eq(usersReceivers.userId, sql.placeholder('userId')),
                        eq(usersReceivers.receiverId, sql.placeholder('receiverId')),
                    ),
                )
                .prepare('get_joined_user_receiver_by_id')
                .execute({ userId, receiverId }),
            'Unable to find',
        );
    }

    getManyJoinedById(userId: string, receiverIds: string[]): Promise<TSelectReceiver[]> {
        return toEntities(
            this.db
                .select({
                    id: receivers.id,
                    name: receivers.name,
                    createdAt: receivers.createdAt,
                    updatedAt: receivers.updatedAt,
                })
                .from(usersReceivers)
                .innerJoin(receivers, eq(usersReceivers.receiverId, receivers.id))
                .where(
                    and(
                        eq(usersReceivers.userId, sql.placeholder('userId')),
                        inArray(usersReceivers.receiverId, receiverIds),
                    ),
                )
                .prepare('get_many_joined_user_receiver_by_id')
                .execute({ userId }),
        );
    }
}
