import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import {
    toEntityOrNull,
    toEntityOrThrow,
} from '@/infrastructure/database/drizzle/drizzle.transformer';
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
            this.db.insert(usersReceivers).values(data).returning(),
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
                ),
        );
    }
}
