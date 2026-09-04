import { Injectable } from '@nestjs/common';

import type { IMessageHandler } from './messageHandler.interface';
import type { TOutboxEventType } from '@/modules/outbox/domain/types/outboxEventType.type';

@Injectable()
export class MessageRegistryService {
    private readonly handlers = new Map<TOutboxEventType, IMessageHandler<object>[]>();

    register(handler: IMessageHandler<object>, eventType: TOutboxEventType): void {
        const handlers = this.handlers.get(eventType) ?? [];
        handlers.push(handler);
        this.handlers.set(eventType, handlers);
    }

    get(eventType: TOutboxEventType): readonly IMessageHandler<object>[] {
        return this.handlers.get(eventType) ?? [];
    }
}
