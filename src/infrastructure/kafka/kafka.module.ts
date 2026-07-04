import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DiscoveryService } from '@nestjs/core';
import { Kafka } from 'kafkajs';

import { KAFKA_PROVIDER } from './kafka.constants';
import { KafkaConsumerService } from './kafkaConsumer.service';
import { KafkaDiscoveryService } from './kafkaDiscovery.servicce';
import { KafkaRegistryService } from './kafkaRegistry.service';

@Module({
    imports: [ConfigModule],
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
        KafkaRegistryService,
        KafkaDiscoveryService,
        KafkaConsumerService,
        DiscoveryService,
    ],
    exports: [KAFKA_PROVIDER],
})
export class KafkaModule {}
