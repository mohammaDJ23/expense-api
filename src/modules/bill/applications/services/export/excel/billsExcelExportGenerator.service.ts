import { PassThrough } from 'stream';

import { Injectable } from '@nestjs/common';
import ExcelJS from 'exceljs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ExcelMetadataSheets } from '@/core/features/export/excel/excelMetadata.sheets';
import { toHeader } from '@/core/utils/toHeader.util';

import { BILL_EXPORT_KEYS, BILLS_SHEET_NAME } from './billsExcelExport.constants';

import type { IExcelContext } from '@/core/features/export/excel/excelContext.type';
import type { IExcelGenerator } from '@/core/features/export/excel/excelGenerator.interface';
import type { IBill } from '@/modules/bill/domain/types/bill.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class BillsExcelExportGeneratorService implements IExcelGenerator<IBill> {
    constructor(private readonly excelMetadataSheets: ExcelMetadataSheets) {}

    initialize(): IExcelContext {
        const stream = new PassThrough();
        const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
            stream,
            useStyles: true,
            useSharedStrings: true,
        });

        return {
            stream,
            workbook,
        };
    }

    createMetadataSheets(user: ISelectUser, workbook: ExcelJS.stream.xlsx.WorkbookWriter): void {
        this.excelMetadataSheets.createUserMetadataSheet(user, workbook);
    }

    createSheet(workbook: ExcelJS.stream.xlsx.WorkbookWriter): ExcelJS.Worksheet {
        const sheet = workbook.addWorksheet(BILLS_SHEET_NAME);
        sheet.columns = BILL_EXPORT_KEYS.map((key) => ({
            header: toHeader(key),
            key,
            width: 40,
        }));
        return sheet;
    }

    addRows(sheet: ExcelJS.Worksheet, rows: IBill[]): void {
        for (const row of rows) {
            const excelRow = sheet.addRow({
                ...row,
                location: row.location.name,
                receiver: row.receiver.name,
                consumers: row.consumers.map((consumer) => consumer.name).join(', '),
            });
            excelRow.commit();
        }
    }

    async generate(workbook: ExcelJS.stream.xlsx.WorkbookWriter): Promise<void> {
        try {
            await workbook.commit();
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
