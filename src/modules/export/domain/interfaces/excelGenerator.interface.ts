export interface IExcelGenerator<TRow> {
    generate(row: TRow): Promise<Buffer>;
}
