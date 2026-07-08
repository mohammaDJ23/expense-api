import type { IMessageBatch } from './messageBatch.interface';

export interface IMessageProcessor<T> {
    process(batch: IMessageBatch<T>[]): Promise<void>;
}
