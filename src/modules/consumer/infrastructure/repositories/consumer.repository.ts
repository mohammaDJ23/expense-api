import { Injectable } from '@nestjs/common';
import { inArray } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntities } from '@/infrastructure/database/drizzle/drizzle.transformer';
import {
    consumers,
    type TInsertConsumer,
    type TSelectConsumer,
} from '@/modules/consumer/infrastructure/schemas/consumer.schema';

import type { IConsumerRepository } from '@/modules/consumer/domain/interfaces/consumerRepository.interface';

@Injectable()
export class ConsumerRepository extends DrizzleRepository implements IConsumerRepository {
    createMany(data: TInsertConsumer[]): Promise<TSelectConsumer[]> {
        return toEntities(
            this.db
                .insert(consumers)
                .values(data)
                .returning()
                .prepare('create_many_consumers')
                .execute(),
        );
    }

    getManyByName(names: string[]): Promise<TSelectConsumer[]> {
        return toEntities(
            this.db
                .select()
                .from(consumers)
                .where(inArray(consumers.name, names))
                .prepare('get_many_consumers_by_name')
                .execute(),
        );
    }
}
