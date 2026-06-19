import { Injectable } from '@nestjs/common';
import { and, eq, inArray } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import {
    toEntitiesOrThrow,
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
            this.db.insert(usersReceivers).values(data).returning().execute(),
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
                        eq(usersReceivers.userId, userId),
                        eq(usersReceivers.receiverId, receiverId),
                    ),
                )
                .execute(),
        );
    }

    getManyJoinedByIdOrThrow(userId: string, receiverIds: string[]): Promise<TSelectReceiver[]> {
        return toEntitiesOrThrow(
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
                        eq(usersReceivers.userId, userId),
                        inArray(usersReceivers.receiverId, receiverIds),
                    ),
                )
                .execute(),
            'Unable to load the receiver',
        );
    }
}
