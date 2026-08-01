import type { IMessageBatch } from './messageBatch.type';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';

export interface IMessageHandler<T> {
    readonly route: TOutboxEventRoute;

    execute(batch: IMessageBatch<T>[]): Promise<void>;
}
