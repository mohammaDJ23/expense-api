import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kafka } from 'kafkajs';

import { MessageModule } from '@/core/message/message.module';

import { KAFKA_PROVIDER } from './kafka.constants';
import { KafkaConsumerService } from './kafkaConsumer.service';

@Module({
    imports: [MessageModule],
    providers: [
        {
            provide: KAFKA_PROVIDER,
            inject: [ConfigService],
            useFactory: (configService: ConfigService): Kafka => {
                return new Kafka({
                    clientId: configService.getOrThrow<string>('KAFKA_CLIENT_ID'),
                    brokers: configService.getOrThrow<string>('KAFKA_BROKERS').split(','),
                    retry: {
                        retries: 10,
                        initialRetryTime: 300,
                    },
                    connectionTimeout: 10_000,
                    requestTimeout: 30_000,
                });
            },
        },
        KafkaConsumerService,
    ],
    exports: [KAFKA_PROVIDER],
})
export class KafkaModule {}
