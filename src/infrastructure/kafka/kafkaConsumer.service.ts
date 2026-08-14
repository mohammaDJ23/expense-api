import {
    Inject,
    Injectable,
    InternalServerErrorException,
    type OnModuleInit,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka } from 'kafkajs';

import { MessageRegistryService } from '@/core/features/message/messageRegistry.service';
import { OUTBOX_EVENT_ROUTES } from '@/modules/outbox/domain/domain.constants';

import { KAFKA_PROVIDER } from './kafka.constants';
import { KafkaBatchParserService } from './kafkaBatchParser.service';

import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
    constructor(
        @Inject(KAFKA_PROVIDER)
        private readonly kafka: Kafka,
        private readonly configService: ConfigService,
        private readonly messageRegistryService: MessageRegistryService,
        private readonly kafkaBatchParserService: KafkaBatchParserService,
    ) {}

    async onModuleInit(): Promise<void> {
        try {
            const admin = this.kafka.admin();

            await admin.connect();

            await admin.createTopics({
                waitForLeaders: true,
                topics: OUTBOX_EVENT_ROUTES.map((topic) => ({
                    topic,
                    numPartitions: 1,
                    replicationFactor: 1,
                })),
            });

            await admin.disconnect();

            const consumer = this.kafka.consumer({
                groupId: this.configService.getOrThrow<string>('KAFKA_GROUP_ID'),
            });

            await consumer.connect();
            await Promise.all(
                OUTBOX_EVENT_ROUTES.map((topic) =>
                    consumer.subscribe({
                        topic,
                        fromBeginning: true,
                    }),
                ),
            );
            await consumer.run({
                eachBatch: async (eachBatch) => {
                    const handlers = this.messageRegistryService.get(
                        eachBatch.batch.topic as TOutboxEventRoute,
                    );
                    const parsedBatch = this.kafkaBatchParserService.execute(eachBatch.batch);
                    await Promise.all(handlers.map((handler) => handler.execute(parsedBatch)));
                },
            });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
