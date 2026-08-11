import type { IStream } from '@/core/types/stream.type';
import type ExcelJS from 'exceljs';

export interface IExcelContext extends IStream {
    workbook: ExcelJS.stream.xlsx.WorkbookWriter;
}
