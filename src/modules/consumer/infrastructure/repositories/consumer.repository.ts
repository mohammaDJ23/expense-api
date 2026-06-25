import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntityOrNull } from '@/infrastructure/database/drizzle/transformers/toEntityOrNull.transformer';
import { toEntityOrThrow } from '@/infrastructure/database/drizzle/transformers/toEntityOrThrow.transformer';
import {
    consumers,
    type IInsertConsumer,
    type ISelectConsumer,
} from '@/modules/consumer/infrastructure/schemas/consumer.schema';

import type { IConsumerRepository } from '@/modules/consumer/domain/interfaces/consumerRepository.interface';

@Injectable()
export class ConsumerRepository implements IConsumerRepository {
    constructor(private readonly drizzleRepository: DrizzleRepository) {}

    create(data: IInsertConsumer): Promise<ISelectConsumer> {
        return toEntityOrThrow(
            this.drizzleRepository.db.insert(consumers).values(data).returning().execute(),
            'Unable to create',
        );
    }

    findByNameOrNull(name: string): Promise<ISelectConsumer | null> {
        return toEntityOrNull(
            this.drizzleRepository.db
                .select()
                .from(consumers)
                .where(eq(consumers.name, name))
                .execute(),
        );
    }
}
