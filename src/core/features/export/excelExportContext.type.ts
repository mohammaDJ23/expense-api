import type { IExportContext } from './exportContext.type';
import type ExcelJS from 'exceljs';

export interface IExcelExportContext extends IExportContext {
    workbook: ExcelJS.stream.xlsx.WorkbookWriter;
    sheet: ExcelJS.Worksheet;
}
