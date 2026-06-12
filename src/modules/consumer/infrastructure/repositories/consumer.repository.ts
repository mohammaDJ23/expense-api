import { Injectable } from '@nestjs/common';
import { eq, inArray } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import {
    toEntities,
    toEntityOrNull,
    toEntityOrThrow,
} from '@/infrastructure/database/drizzle/drizzle.transformer';
import {
    consumers,
    type TInsertConsumer,
    type TSelectConsumer,
} from '@/modules/consumer/infrastructure/schemas/consumer.schema';

import type { IConsumerRepository } from '@/modules/consumer/domain/interfaces/consumerRepository.interface';

@Injectable()
export class ConsumerRepository extends DrizzleRepository implements IConsumerRepository {
    create(data: TInsertConsumer): Promise<TSelectConsumer> {
        return toEntityOrThrow(
            this.db.insert(consumers).values(data).returning(),
            'Unable to create',
        );
    }

    createMany(data: TInsertConsumer[]): Promise<TSelectConsumer[]> {
        return toEntities(this.db.insert(consumers).values(data).returning());
    }

    getByNameOrNull(name: string): Promise<TSelectConsumer | null> {
        return toEntityOrNull(this.db.select().from(consumers).where(eq(consumers.name, name)));
    }

    getManyByName(names: string[]): Promise<TSelectConsumer[]> {
        return toEntities(this.db.select().from(consumers).where(inArray(consumers.name, names)));
    }
}
