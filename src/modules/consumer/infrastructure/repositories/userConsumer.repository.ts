import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import {
    toEntityOrNull,
    toEntityOrThrow,
} from '@/infrastructure/database/drizzle/drizzle.transformer';
import {
    usersConsumers,
    type TInsertUserConsumer,
    type TSelectUserConsumer,
} from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

import type { IUserConsumerRepository } from '@/modules/consumer/domain/interfaces/userConsumerRepository.interface';

@Injectable()
export class UserConsumerRepository extends DrizzleRepository implements IUserConsumerRepository {
    create(data: TInsertUserConsumer): Promise<TSelectUserConsumer> {
        return toEntityOrThrow(
            this.db.insert(usersConsumers).values(data).returning(),
            'Unable to create',
        );
    }

    getByIdOrNull(userId: string, consumerId: string): Promise<TSelectUserConsumer | null> {
        return toEntityOrNull(
            this.db
                .select()
                .from(usersConsumers)
                .where(
                    and(
                        eq(usersConsumers.userId, userId),
                        eq(usersConsumers.consumerId, consumerId),
                    ),
                ),
        );
    }
}
