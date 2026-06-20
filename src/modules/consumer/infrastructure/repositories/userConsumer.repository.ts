import { Injectable } from '@nestjs/common';
import { and, eq, inArray } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntities } from '@/infrastructure/database/drizzle/drizzle.transformer';
import {
    usersConsumers,
    type TInsertUserConsumer,
    type TSelectUserConsumer,
} from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

import type { IUserConsumerRepository } from '@/modules/consumer/domain/interfaces/userConsumerRepository.interface';

@Injectable()
export class UserConsumerRepository implements IUserConsumerRepository {
    constructor(private readonly drizzleRepository: DrizzleRepository) {}

    createMany(data: TInsertUserConsumer[]): Promise<TSelectUserConsumer[]> {
        return toEntities(
            this.drizzleRepository.db.insert(usersConsumers).values(data).returning().execute(),
        );
    }

    getManyById(userId: string, consumerIds: string[]): Promise<TSelectUserConsumer[]> {
        return toEntities(
            this.drizzleRepository.db
                .select()
                .from(usersConsumers)
                .where(
                    and(
                        eq(usersConsumers.userId, userId),
                        inArray(usersConsumers.consumerId, consumerIds),
                    ),
                )
                .execute(),
        );
    }
}
