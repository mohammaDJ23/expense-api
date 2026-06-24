import { Injectable } from '@nestjs/common';
import { and, desc, eq } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntities } from '@/infrastructure/database/drizzle/transformers/toEntities.transformer';
import { toEntityOrNull } from '@/infrastructure/database/drizzle/transformers/toEntityOrNull.transformer';
import { toEntityOrThrow } from '@/infrastructure/database/drizzle/transformers/toEntityOrThrow.transformer';
import {
    consumers,
    type ISelectConsumer,
} from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import {
    usersConsumers,
    type ISelectUserConsumer,
    type IInsertUserConsumer,
} from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

import type { IList } from '@/core/interfaces/list.interface';
import type { IUserConsumerRepository } from '@/modules/consumer/domain/interfaces/userConsumerRepository.interface';

@Injectable()
export class UserConsumerRepository implements IUserConsumerRepository {
    constructor(private readonly drizzleRepository: DrizzleRepository) {}

    create(data: IInsertUserConsumer): Promise<ISelectUserConsumer> {
        return toEntityOrThrow(
            this.drizzleRepository.db.insert(usersConsumers).values(data).returning().execute(),
            'Unable to create',
        );
    }

    findByRefIdAndTargetIdOrNull(
        refId: string,
        targetId: string,
    ): Promise<ISelectUserConsumer | null> {
        return toEntityOrNull(
            this.drizzleRepository.db
                .select()
                .from(usersConsumers)
                .where(
                    and(eq(usersConsumers.userId, refId), eq(usersConsumers.consumerId, targetId)),
                )
                .execute(),
        );
    }

    findTargetByRefIdAndTargetIdOrThrow(refId: string, targetId: string): Promise<ISelectConsumer> {
        return toEntityOrThrow(
            this.drizzleRepository.db
                .select({
                    id: consumers.id,
                    name: consumers.name,
                    createdAt: consumers.createdAt,
                    updatedAt: consumers.updatedAt,
                })
                .from(usersConsumers)
                .innerJoin(consumers, eq(usersConsumers.consumerId, consumers.id))
                .where(
                    and(eq(usersConsumers.userId, refId), eq(usersConsumers.consumerId, targetId)),
                )
                .execute(),
            'Unable to find',
        );
    }

    findTargetsByRefId(refId: string, options: IList): Promise<ISelectConsumer[]> {
        return toEntities(
            this.drizzleRepository.db
                .select({
                    id: consumers.id,
                    name: consumers.name,
                    createdAt: consumers.createdAt,
                    updatedAt: consumers.updatedAt,
                })
                .from(usersConsumers)
                .innerJoin(consumers, eq(usersConsumers.consumerId, consumers.id))
                .where(eq(usersConsumers.userId, refId))
                .orderBy(desc(usersConsumers.createdAt))
                .offset(options.offset)
                .limit(options.limit)
                .execute(),
        );
    }
}
