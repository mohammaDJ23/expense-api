import { Injectable } from '@nestjs/common';

import type { IMessageHandler } from './messageHandler.interface';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/interfaces/outboxEventRoute.interface';

@Injectable()
export class MessageRegistryService {
    private readonly handlers = new Map<TOutboxEventRoute, IMessageHandler<object>[]>();

    register(handler: IMessageHandler<object>): void {
        const handlers = this.handlers.get(handler.route) ?? [];
        handlers.push(handler);
        this.handlers.set(handler.route, handlers);
    }

    get(aggregate: TOutboxEventRoute): readonly IMessageHandler<object>[] {
        return this.handlers.get(aggregate) ?? [];
    }
}
