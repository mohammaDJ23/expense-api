import { Injectable } from '@nestjs/common';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntityOrThrow } from '@/infrastructure/database/drizzle/drizzle.transformer';
import {
    consumers,
    type TInsertConsumer,
    type TSelectConsumer,
} from '@/modules/consumers/infrastructure/schemas/consumer.schema';

import type { IConsumerRepository } from '@/modules/consumers/domain/interfaces/consumerRepository.interface';

@Injectable()
export class ConsumerRepository extends DrizzleRepository implements IConsumerRepository {
    create(data: TInsertConsumer): Promise<TSelectConsumer> {
        return toEntityOrThrow(
            this.db.insert(consumers).values(data).returning(),
            'Unable to create',
        );
    }
}
