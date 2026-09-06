export interface IExportGenerator<TInput, TOutput> {
    generate(input: TInput): Promise<TOutput>;
}
