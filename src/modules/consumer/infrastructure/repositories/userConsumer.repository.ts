import { Injectable } from '@nestjs/common';
import { and, eq, inArray, sql } from 'drizzle-orm';

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
        return toEntities(
            this.db
                .insert(usersConsumers)
                .values(data)
                .returning()
                .prepare('create_many_users_consumers')
                .execute(),
        );
    }

    getManyById(userId: string, consumerIds: string[]): Promise<TSelectUserConsumer[]> {
        return toEntities(
            this.db
                .select()
                .from(usersConsumers)
                .where(
                    and(
                        eq(usersConsumers.userId, sql.placeholder('userId')),
                        inArray(usersConsumers.consumerId, consumerIds),
                    ),
                )
                .prepare('get_many_users_consumers_by_id')
                .execute({ userId }),
        );
    }
}
