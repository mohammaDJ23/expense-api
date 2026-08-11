import type { IExcelContext } from './excelContext.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';
import type ExcelJS from 'exceljs';

export interface IExcelGenerator<TRow> {
    initialize(): IExcelContext;
    createMetadataSheets(user: ISelectUser, workbook: ExcelJS.stream.xlsx.WorkbookWriter): void;
    createSheet(workbook: ExcelJS.stream.xlsx.WorkbookWriter): ExcelJS.Worksheet;
    addRows(sheet: ExcelJS.Worksheet, rows: TRow[]): void;
    generate(workbook: ExcelJS.stream.xlsx.WorkbookWriter): Promise<void>;
}
