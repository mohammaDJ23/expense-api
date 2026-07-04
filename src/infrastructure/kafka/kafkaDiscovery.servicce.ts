import { Injectable, type OnModuleInit } from '@nestjs/common';
import { DiscoveryService, Reflector } from '@nestjs/core';

import { KAFKA_HANDLER_METADATA } from './kafka.constants';
import { KafkaRegistryService } from './kafkaRegistry.service';

import type { IKafkaHandler } from './kafkaHandler.interface';

@Injectable()
export class KafkaDiscoveryService implements OnModuleInit {
    constructor(
        private readonly reflector: Reflector,
        private readonly discoveryService: DiscoveryService,
        private readonly kafkaRegistryService: KafkaRegistryService,
    ) {}

    onModuleInit(): void {
        const providers = this.discoveryService.getProviders();

        for (const wrapper of providers) {
            const instance = wrapper.instance;

            if (!instance) {
                continue;
            }

            const isKafkaHandler = this.reflector.get<boolean>(
                KAFKA_HANDLER_METADATA,
                instance.constructor,
            );

            if (!isKafkaHandler) {
                continue;
            }

            this.kafkaRegistryService.register(instance as IKafkaHandler);
        }
    }
}
