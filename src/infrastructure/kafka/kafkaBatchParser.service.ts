import { Injectable, InternalServerErrorException } from '@nestjs/common';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessagePayload } from '@/core/features/message/messagePayload.type';
import type { IService } from '@/core/interfaces/service.interface';
import type { TOutboxEventAggregateType } from '@/modules/outbox/domain/types/outboxEventAggregateType.type';
import type { TOutboxEventType } from '@/modules/outbox/domain/types/outboxEventType.type';
import type { Batch, IHeaders, KafkaMessage } from 'kafkajs';

@Injectable()
export class KafkaBatchParserService implements IService<Batch, IMessageBatch[]> {
    execute<T = object>(input: Batch): IMessageBatch<T>[] {
        const messages: IMessageBatch<T>[] = [];

        for (const message of input.messages) {
            messages.push({
                aggregateType: this.getRequiredHeader<TOutboxEventAggregateType>(
                    message.headers,
                    'aggregateType',
                ),
                aggregateId: this.getRequiredHeader<string>(message.headers, 'aggregateId'),
                eventType: this.getRequiredHeader<TOutboxEventType>(message.headers, 'eventType'),
                createdAt: this.getRequiredHeader<string>(message.headers, 'createdAt'),
                payload: this.getPayload<T>(message),
            });
        }

        return messages;
    }

    private getRequiredHeader<T>(headers: IHeaders | undefined, key: keyof IHeaders): T {
        if (!headers) {
            throw new InternalServerErrorException(`Missing kafka headers`);
        }

        const value = headers[key as keyof typeof headers];

        if (!value) {
            throw new InternalServerErrorException(`Missing ${String(key)} header`);
        }

        return value.toString() as T;
    }

    private getPayload<T>(message: KafkaMessage): T {
        if (!message.value) {
            throw new InternalServerErrorException('No value found from kafka');
        }

        try {
            const value = JSON.parse(message.value.toString()) as IMessagePayload<string>;
            if (!('payload' in value)) {
                throw new Error('No payload found from kafka');
            }
            return JSON.parse(value.payload) as T;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
