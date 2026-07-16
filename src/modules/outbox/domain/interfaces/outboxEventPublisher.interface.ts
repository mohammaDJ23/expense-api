export interface IOutboxEventPublisherService<TInput, TOutput> {
    publish(input: TInput): Promise<TOutput>;
}
