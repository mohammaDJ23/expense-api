export interface IProcessor<TInput, TOutput> {
    process(input: TInput): Promise<TOutput>;
}
