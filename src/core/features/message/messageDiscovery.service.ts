import { Injectable, type OnModuleInit } from '@nestjs/common';
import { DiscoveryService, Reflector } from '@nestjs/core';

import { MESSAGE_HANDLER_METADATA } from './message.constants';
import { MessageRegistryService } from './messageRegistry.service';

import type { IMessageHandler } from './messageHandler.interface';
import type { TOutboxEventType } from '@/modules/outbox/domain/types/outboxEventType.type';

@Injectable()
export class MessageDiscoveryService implements OnModuleInit {
    constructor(
        private readonly reflector: Reflector,
        private readonly discoveryService: DiscoveryService,
        private readonly messageRegistryService: MessageRegistryService,
    ) {}

    onModuleInit(): void {
        const providers = this.discoveryService.getProviders();

        for (const wrapper of providers) {
            const instance = wrapper.instance;

            if (!instance) {
                continue;
            }

            const eventType = this.reflector.get<TOutboxEventType>(
                MESSAGE_HANDLER_METADATA,
                instance.constructor,
            );

            if (!eventType) {
                continue;
            }

            this.messageRegistryService.register(instance as IMessageHandler<object>, eventType);
        }
    }
}
