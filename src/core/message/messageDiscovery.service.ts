import { Injectable, type OnModuleInit } from '@nestjs/common';
import { DiscoveryService, Reflector } from '@nestjs/core';

import { MESSAGE_HANDLER_METADATA } from './message.constants';
import { MessageRegistryService } from './messageRegistry.service';

import type { IMessageHandler } from './messageHandler.interface';

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

            const isMessageHandler = this.reflector.get<boolean>(
                MESSAGE_HANDLER_METADATA,
                instance.constructor,
            );

            if (!isMessageHandler) {
                continue;
            }

            this.messageRegistryService.register(instance as IMessageHandler);
        }
    }
}
