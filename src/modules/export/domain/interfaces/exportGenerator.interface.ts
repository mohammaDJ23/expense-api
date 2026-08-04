export interface IExportGenerator<TRow, TOutput> {
    generate(rows: TRow): Promise<TOutput>;
}
