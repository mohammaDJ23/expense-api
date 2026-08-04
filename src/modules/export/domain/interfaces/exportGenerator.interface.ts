export interface IExportGenerator<TRow> {
    generate(row: TRow): Promise<Buffer>;
}
