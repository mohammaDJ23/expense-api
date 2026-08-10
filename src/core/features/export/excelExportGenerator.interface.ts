import type { IExcelExportContext } from '@/core/features/export/excelExportContext.type';

export interface IExcelExportGenerator<TRow> {
    initialize(): IExcelExportContext;
    addRows(context: IExcelExportContext, rows: TRow[]): void;
    generate(context: IExcelExportContext): Promise<void>;
}
