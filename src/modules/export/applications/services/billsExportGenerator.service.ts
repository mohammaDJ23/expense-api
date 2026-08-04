import { Injectable } from '@nestjs/common';
import ExcelJS from 'exceljs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';

import { BILL_EXPORT_KEYS } from './services.constant';

import type { IBill } from '@/modules/bill/domain/types/bill.type';
import type { IExportGenerator } from '@/modules/export/domain/interfaces/exportGenerator.interface';

@Injectable()
export class BillsExportGeneratorService implements IExportGenerator<IBill[], ExcelJS.Buffer> {
    async generate(rows: IBill[]): Promise<ExcelJS.Buffer> {
        const workbook = new ExcelJS.Workbook();

        const sheet = workbook.addWorksheet('Bills');

        sheet.columns = BILL_EXPORT_KEYS.map((key) => ({
            header: this.toHeader(key),
            key,
            width: 30,
        }));

        sheet.addRows(
            rows.map((row) => ({
                ...row,
                location: row.location.name,
                receiver: row.receiver.name,
                consumers: row.consumers.map((consumer) => consumer.name).join(', '),
            })),
        );

        try {
            return await workbook.xlsx.writeBuffer();
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }

    private toHeader(str: string): string {
        return str.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
    }
}
