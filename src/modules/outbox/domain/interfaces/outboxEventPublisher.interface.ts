import type {
    IInsertOutboxEvent,
    ISelectOutboxEvent,
} from '@/modules/outbox/infrastructure/schemas/outboxEvent.schema';

export interface IOutboxEventPublisherService<
    TInput = IInsertOutboxEvent,
    TOutput = ISelectOutboxEvent,
> {
    publish(input: TInput): Promise<TOutput>;
}
