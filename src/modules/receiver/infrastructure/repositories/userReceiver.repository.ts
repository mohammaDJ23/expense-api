import { Injectable } from '@nestjs/common';
import { and, desc, eq } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntities } from '@/infrastructure/database/drizzle/transformers/toEntities.transformer';
import { toEntityOrNull } from '@/infrastructure/database/drizzle/transformers/toEntityOrNull.transformer';
import { toEntityOrThrow } from '@/infrastructure/database/drizzle/transformers/toEntityOrThrow.transformer';
import { toIsExistsByCount } from '@/infrastructure/database/drizzle/transformers/toIsExistsByCount.transformer';
import {
    receivers,
    type ISelectReceiver,
} from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import {
    usersReceivers,
    type IInsertUserReceiver,
    type ISelectUserReceiver,
} from '@/modules/receiver/infrastructure/schemas/userReceiver.schema';

import type { IList } from '@/core/interfaces/list.interface';
import type { IUserReceiverRepository } from '@/modules/receiver/domain/interfaces/userReceiverRepository.interface';

@Injectable()
export class UserReceiverRepository implements IUserReceiverRepository {
    constructor(private readonly drizzleRepository: DrizzleRepository) {}

    create(data: IInsertUserReceiver): Promise<ISelectUserReceiver> {
        return toEntityOrThrow(
            this.drizzleRepository.db.insert(usersReceivers).values(data).returning().execute(),
            'Unable to create',
        );
    }

    findByRefIdAndTargetIdOrNull(
        refId: string,
        targetId: string,
    ): Promise<ISelectUserReceiver | null> {
        return toEntityOrNull(
            this.drizzleRepository.db
                .select()
                .from(usersReceivers)
                .where(
                    and(eq(usersReceivers.userId, refId), eq(usersReceivers.receiverId, targetId)),
                )
                .execute(),
        );
    }

    isExistsByRefIdAndTargetId(refId: string, targetId: string): Promise<boolean> {
        return toIsExistsByCount(
            this.drizzleRepository.db.$count(
                usersReceivers,
                and(eq(usersReceivers.userId, refId), eq(usersReceivers.receiverId, targetId)),
            ),
        );
    }

    findTargetByRefIdAndTargetIdOrThrow(refId: string, targetId: string): Promise<ISelectReceiver> {
        return toEntityOrThrow(
            this.drizzleRepository.db
                .select({
                    id: receivers.id,
                    name: receivers.name,
                    createdAt: receivers.createdAt,
                    updatedAt: receivers.updatedAt,
                })
                .from(usersReceivers)
                .innerJoin(receivers, eq(usersReceivers.receiverId, receivers.id))
                .where(
                    and(eq(usersReceivers.userId, refId), eq(usersReceivers.receiverId, targetId)),
                )
                .execute(),
            'Unable to find',
        );
    }

    findTargetListByRefId(refId: string, options: IList): Promise<ISelectReceiver[]> {
        return toEntities(
            this.drizzleRepository.db
                .select({
                    id: receivers.id,
                    name: receivers.name,
                    createdAt: receivers.createdAt,
                    updatedAt: receivers.updatedAt,
                })
                .from(usersReceivers)
                .innerJoin(receivers, eq(usersReceivers.receiverId, receivers.id))
                .where(and(eq(usersReceivers.userId, refId)))
                .orderBy(desc(usersReceivers.createdAt))
                .offset(options.offset)
                .limit(options.limit)
                .execute(),
        );
    }
}
