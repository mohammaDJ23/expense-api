import { Injectable, InternalServerErrorException } from '@nestjs/common';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IMessageBatch } from '@/core/message/messageBatch.interface';
import type { IMessagePayload } from '@/core/message/messagePayload.interface';
import type { Batch, IHeaders, KafkaMessage } from 'kafkajs';

@Injectable()
export class KafkaBatchParserService implements IServiceHandler {
    execute<T = object>(batch: Batch): IMessageBatch<T>[] {
        const messages: IMessageBatch<T>[] = [];

        for (const message of batch.messages) {
            messages.push({
                aggregateType: this.getRequiredHeader(message.headers, 'aggregateType'),
                aggregateId: this.getRequiredHeader(message.headers, 'aggregateId'),
                eventType: this.getRequiredHeader(message.headers, 'eventType'),
                createdAt: this.getRequiredHeader(message.headers, 'createdAt'),
                payload: this.getPayload<T>(message),
            });
        }

        return messages;
    }

    private getRequiredHeader(headers: IHeaders | undefined, key: keyof IHeaders): string {
        if (!headers) {
            throw new InternalServerErrorException(`Missing kafka headers`);
        }

        // eslint-disable-next-line security/detect-object-injection
        const value = headers[key];

        if (!value) {
            throw new InternalServerErrorException(`Missing ${String(key)} header`);
        }

        return value.toString();
    }

    private getPayload<T>(message: KafkaMessage): T {
        if (!message.value) {
            throw new InternalServerErrorException('No value found from kafka');
        }

        const value = JSON.parse(message.value.toString()) as IMessagePayload<string> | undefined;
        if (!value || !('payload' in value)) {
            throw new InternalServerErrorException('No payload found from kafka');
        }
        return JSON.parse(value.payload) as T;
    }
}
