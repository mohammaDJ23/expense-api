import type { IMessageBatch } from './messageBatch.type';

export interface IMessageProcessor<T> {
    process(batch: IMessageBatch<T>[]): Promise<void>;
}
