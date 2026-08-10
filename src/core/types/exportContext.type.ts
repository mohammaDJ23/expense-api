import type ExcelJS from 'exceljs';
import type { PassThrough } from 'node:stream';

export interface IExportContext {
    stream: PassThrough;
    workbook: ExcelJS.stream.xlsx.WorkbookWriter;
    sheet: ExcelJS.Worksheet;
}
