import { PassThrough } from 'stream';

import { Injectable } from '@nestjs/common';
import ExcelJS from 'exceljs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';

import { BILL_EXPORT_KEYS, BILL_SHEET_NAME } from './billsExportGenerator.constant';

import type { IExportGenerator } from '@/core/interfaces/export/exportGenerator.interface';
import type { IExportContext } from '@/core/types/exportContext.type';
import type { IBill } from '@/modules/bill/domain/types/bill.type';

@Injectable()
export class BillsExportGeneratorService implements IExportGenerator<IBill> {
    initialize(): IExportContext {
        const stream = new PassThrough();

        const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
            stream,
            useStyles: true,
            useSharedStrings: true,
        });

        const sheet = workbook.addWorksheet(BILL_SHEET_NAME);

        sheet.columns = BILL_EXPORT_KEYS.map((key) => ({
            header: this.toHeader(key),
            key,
            width: 30,
        }));

        return {
            stream,
            workbook,
            sheet,
        };
    }

    addRows(context: IExportContext, rows: IBill[]): void {
        for (const row of rows) {
            const excelRow = context.sheet.addRow({
                ...row,
                location: row.location.name,
                receiver: row.receiver.name,
                consumers: row.consumers.map((consumer) => consumer.name).join(', '),
            });

            excelRow.commit();
        }
    }

    async generate(context: IExportContext): Promise<void> {
        try {
            await context.workbook.commit();
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }

    private toHeader(str: string): string {
        return str.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
    }
}
