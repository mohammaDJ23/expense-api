import { Injectable } from '@nestjs/common';

import type { IMessageHandler } from './messageHandler.interface';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/interfaces/outboxEventAggregateType.interface';

@Injectable()
export class MessageRegistryService {
    private readonly handlers = new Map<TOutboxEventAggregateType, IMessageHandler[]>();

    register(handler: IMessageHandler): void {
        const handlers = this.handlers.get(handler.aggregateType) ?? [];
        handlers.push(handler);
        this.handlers.set(handler.aggregateType, handlers);
    }

    get(aggregate: TOutboxEventAggregateType): readonly IMessageHandler[] {
        return this.handlers.get(aggregate) ?? [];
    }
}
