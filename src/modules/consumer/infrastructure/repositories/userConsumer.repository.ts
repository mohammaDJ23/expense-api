import { Injectable } from '@nestjs/common';
import { and, eq, or } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntities } from '@/infrastructure/database/drizzle/drizzle.transformer';
import {
    usersConsumers,
    type TInsertUserConsumer,
    type TSelectUserConsumer,
} from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

import type { IUserConsumerRepository } from '@/modules/consumer/domain/interfaces/userConsumerRepository.interface';

@Injectable()
export class UserConsumerRepository extends DrizzleRepository implements IUserConsumerRepository {
    createMany(data: TInsertUserConsumer[]): Promise<TSelectUserConsumer[]> {
        return toEntities(this.db.insert(usersConsumers).values(data).returning());
    }

    getManyById(
        data: Pick<TSelectUserConsumer, 'userId' | 'consumerId'>[],
    ): Promise<TSelectUserConsumer[]> {
        return toEntities(
            this.db
                .select()
                .from(usersConsumers)
                .where(
                    or(
                        ...data.map((pair) =>
                            and(
                                eq(usersConsumers.userId, pair.userId),
                                eq(usersConsumers.consumerId, pair.consumerId),
                            ),
                        ),
                    ),
                ),
        );
    }
}
