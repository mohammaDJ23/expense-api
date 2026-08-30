import type { IExcelContext } from './excelContext.type';
import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';
import type ExcelJS from 'exceljs';

export interface IExcelGenerator<TRow> {
    initialize(): IExcelContext;
    createMetadataSheets(
        emailIdentity: ISelectEmailIdentity,
        workbook: ExcelJS.stream.xlsx.WorkbookWriter,
    ): void;
    createSheet(workbook: ExcelJS.stream.xlsx.WorkbookWriter): ExcelJS.Worksheet;
    addRows(sheet: ExcelJS.Worksheet, rows: TRow[]): void;
    generate(workbook: ExcelJS.stream.xlsx.WorkbookWriter): Promise<void>;
}
