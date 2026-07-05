import { Inject, Injectable, type OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka } from 'kafkajs';

import { MessageRegistryService } from '@/core/message/messageRegistry.service';
import { OUTBOX_EVENT_AGGREGATE_TYPES } from '@/modules/outbox/domain/domain.constants';

import { KAFKA_PROVIDER } from './kafka.constants';

import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/interfaces/outboxEventAggregateType.interface';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
    constructor(
        @Inject(KAFKA_PROVIDER)
        private readonly kafka: Kafka,
        private readonly configService: ConfigService,
        private readonly messageRegistryService: MessageRegistryService,
    ) {}

    async onModuleInit(): Promise<void> {
        try {
            const consumer = this.kafka.consumer({
                groupId: this.configService.getOrThrow<string>('KAFKA_GROUP_ID'),
            });

            await consumer.connect();
            await Promise.all(
                OUTBOX_EVENT_AGGREGATE_TYPES.map((topic) =>
                    consumer.subscribe({
                        topic,
                        fromBeginning: true,
                    }),
                ),
            );
            await consumer.run({
                eachBatch: async (eachBatch) => {
                    const handlers = this.messageRegistryService.get(
                        eachBatch.batch.topic as TOutboxEventAggregateType,
                    );
                    await Promise.all(handlers.map((handler) => handler.execute(eachBatch)));
                },
            });
        } catch {
            throw new Error('Kafka initialization failed');
        }
    }
}
