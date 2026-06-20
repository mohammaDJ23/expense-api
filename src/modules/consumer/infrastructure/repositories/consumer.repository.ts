import { Injectable } from '@nestjs/common';
import { inArray } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntities } from '@/infrastructure/database/drizzle/drizzle.transformer';
import {
    consumers,
    type IInsertConsumer,
    type ISelectConsumer,
} from '@/modules/consumer/infrastructure/schemas/consumer.schema';

import type { IConsumerRepository } from '@/modules/consumer/domain/interfaces/consumerRepository.interface';

@Injectable()
export class ConsumerRepository implements IConsumerRepository {
    constructor(private readonly drizzleRepository: DrizzleRepository) {}

    createMany(data: IInsertConsumer[]): Promise<ISelectConsumer[]> {
        return toEntities(
            this.drizzleRepository.db.insert(consumers).values(data).returning().execute(),
        );
    }

    findManyByNames(names: string[]): Promise<ISelectConsumer[]> {
        return toEntities(
            this.drizzleRepository.db
                .select()
                .from(consumers)
                .where(inArray(consumers.name, names))
                .execute(),
        );
    }
}
