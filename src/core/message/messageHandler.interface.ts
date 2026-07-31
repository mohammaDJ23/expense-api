import type { IMessageBatch } from './messageBatch.type';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/interfaces/outboxEventRoute.interface';

export interface IMessageHandler<T> {
    readonly route: TOutboxEventRoute;

    execute(batch: IMessageBatch<T>[]): Promise<void>;
}
