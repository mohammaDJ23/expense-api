import { Injectable } from '@nestjs/common';
import { and, eq, inArray } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntities } from '@/infrastructure/database/drizzle/drizzle.transformer';
import {
    usersConsumers,
    type ISelectUserConsumer,
    type IInsertUserConsumer,
} from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

import type { IUserConsumerRepository } from '@/modules/consumer/domain/interfaces/userConsumerRepository.interface';

@Injectable()
export class UserConsumerRepository implements IUserConsumerRepository {
    constructor(private readonly drizzleRepository: DrizzleRepository) {}

    createMany(data: IInsertUserConsumer[]): Promise<ISelectUserConsumer[]> {
        return toEntities(
            this.drizzleRepository.db.insert(usersConsumers).values(data).returning().execute(),
        );
    }

    findManyByRefIdAndTargetIds(
        refId: string,
        targetIds: string[],
    ): Promise<ISelectUserConsumer[]> {
        return toEntities(
            this.drizzleRepository.db
                .select()
                .from(usersConsumers)
                .where(
                    and(
                        eq(usersConsumers.userId, refId),
                        inArray(usersConsumers.consumerId, targetIds),
                    ),
                )
                .execute(),
        );
    }
}
