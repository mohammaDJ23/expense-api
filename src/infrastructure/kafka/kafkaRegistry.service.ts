import { Injectable } from '@nestjs/common';

import type { IKafkaHandler } from './kafkaHandler.interface';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/interfaces/outboxEventAggregateType.interface';

@Injectable()
export class KafkaRegistryService {
    private readonly handlers = new Map<TOutboxEventAggregateType, IKafkaHandler[]>();

    register(handler: IKafkaHandler): void {
        const handlers = this.handlers.get(handler.aggregateType) ?? [];
        handlers.push(handler);
        this.handlers.set(handler.aggregateType, handlers);
    }

    get(aggregate: TOutboxEventAggregateType): readonly IKafkaHandler[] {
        return this.handlers.get(aggregate) ?? [];
    }
}
