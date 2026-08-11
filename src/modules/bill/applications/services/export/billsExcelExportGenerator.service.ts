import { PassThrough } from 'stream';

import { Injectable } from '@nestjs/common';
import ExcelJS from 'exceljs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { ExcelExportMetadataSheets } from '@/core/features/export/excelExportMetadata.sheets';
import { toHeader } from '@/core/utils/toHeader.util';

import { BILL_EXPORT_KEYS, BILLS_SHEET_NAME } from './billsExport.constants';

import type { IExcelExportContext } from '@/core/features/export/excelExportContext.type';
import type { IExcelExportGenerator } from '@/core/features/export/excelExportGenerator.interface';
import type { IBill } from '@/modules/bill/domain/types/bill.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class BillsExcelExportGeneratorService implements IExcelExportGenerator<IBill> {
    constructor(private readonly excelExportMetadataSheets: ExcelExportMetadataSheets) {}

    initialize(): IExcelExportContext {
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

    createUserMetadataSheet(user: ISelectUser, workbook: ExcelJS.stream.xlsx.WorkbookWriter): void {
        this.excelExportMetadataSheets.createUserMetadataSheet(user, workbook);
    }

    createSheet(workbook: ExcelJS.stream.xlsx.WorkbookWriter): ExcelJS.Worksheet {
        const sheet = workbook.addWorksheet(BILLS_SHEET_NAME);
        sheet.columns = BILL_EXPORT_KEYS.map((key) => ({
            header: toHeader(key),
            key,
            width: 30,
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
