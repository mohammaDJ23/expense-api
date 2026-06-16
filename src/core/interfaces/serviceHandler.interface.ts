export interface IServiceHandler<TInput extends unknown[] = unknown[], TOutput = unknown> {
    execute(...args: TInput): Promise<TOutput> | TOutput;
}
