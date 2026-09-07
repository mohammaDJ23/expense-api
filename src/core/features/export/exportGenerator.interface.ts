export interface IExportGenerator<TInput, TOutput> {
    generate(input: TInput): TOutput | Promise<TOutput>;
}
