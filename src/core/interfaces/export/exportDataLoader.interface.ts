export interface IExportDataLoader<TInput, TOutput> {
    load(input: TInput): Promise<TOutput>;
}
