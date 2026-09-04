import type { IMessageBatch } from './messageBatch.type';

export interface IMessageHandler<T> {
    execute(batch: IMessageBatch<T>[]): Promise<void>;
}
