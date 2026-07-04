import { Inject, Injectable, type OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka } from 'kafkajs';

import { OUTBOX_EVENT_AGGREGATE_TYPES } from '@/modules/outbox/domain/domain.constants';

import { KAFKA_PROVIDER } from './kafka.constants';
import { KafkaRegistryService } from './kafkaRegistry.service';

import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/interfaces/outboxEventAggregateType.interface';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
    constructor(
        @Inject(KAFKA_PROVIDER)
        private readonly kafka: Kafka,
        private readonly configService: ConfigService,
        private readonly kafkaRegistryService: KafkaRegistryService,
    ) {}

    async onModuleInit(): Promise<void> {
        try {
            const consumer = this.kafka.consumer({
                groupId: this.configService.getOrThrow<string>('KAFKA_GROUP_ID'),
            });

            await consumer.connect();
            await Promise.all(
                OUTBOX_EVENT_AGGREGATE_TYPES.map((topic) => consumer.subscribe({ topic })),
            );
            await consumer.run({
                eachBatchAutoResolve: false,
                eachBatch: async (eachBatch) => {
                    console.log(eachBatch);
                    const handlers = this.kafkaRegistryService.get(
                        eachBatch.batch.topic as TOutboxEventAggregateType,
                    );
                    await Promise.all(handlers.map((handler) => handler.handle(eachBatch)));
                },
            });
        } catch {
            throw new Error('Kafka initialization failed');
        }
    }
}
