import { PassThrough } from 'node:stream';

import { Injectable } from '@nestjs/common';
import ExcelJS from 'exceljs';

import { MAX_LIST_LIMIT } from '@/core/core.constants';
import { CursorPaginationService } from '@/core/features/pagination/cursor/cursorPagination.service';
import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { toHeader } from '@/core/utils/toHeader.util';
import { BillsExportDataLoaderService } from '@/modules/bill/applications/services/export/billsExportDataLoader.service';

import {
    BILL_SHEET_KEYS,
    BILLS_SHEET_NAME,
    USER_SHEET_KEYS,
    USER_SHEET_NAME,
} from './billsExcelExport.constants';

import type { IExportGenerator } from '@/core/features/export/exportGenerator.interface';
import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';
import type { IBill } from '@/modules/bill/domain/types/bill.type';

@Injectable()
export class BillsExcelExportGeneratorService implements IExportGenerator<
    ISelectEmailIdentity,
    PassThrough
> {
    constructor(
        private readonly billsExportDataLoader: BillsExportDataLoaderService,
        private readonly cursorPaginationService: CursorPaginationService,
    ) {}

    generate(input: ISelectEmailIdentity): PassThrough {
        const stream = new PassThrough();

        const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
            stream,
            useStyles: true,
            useSharedStrings: true,
        });

        this.write(input, stream, workbook);

        return stream;
    }

    private async write(
        emailIdentity: ISelectEmailIdentity,
        stream: PassThrough,
        workbook: ExcelJS.stream.xlsx.WorkbookWriter,
    ): Promise<void> {
        try {
            {
                const sheet = workbook.addWorksheet(USER_SHEET_NAME);

                sheet.columns = USER_SHEET_KEYS.map((key) => ({
                    header: toHeader(key),
                    key,
                    width: 40,
                }));

                sheet.addRow({
                    userId: emailIdentity.userId,
                    email: emailIdentity.email,
                    generatedAt: getCurrentUTCTimestamp(),
                });
            }

            {
                const sheet = workbook.addWorksheet(BILLS_SHEET_NAME);

                sheet.columns = BILL_SHEET_KEYS.map((key) => ({
                    header: toHeader(key),
                    key,
                    width: 40,
                }));

                for await (const bill of this.cursorPaginationService.cursorItemsIterator<
                    IBill,
                    string
                >((cursor) =>
                    this.billsExportDataLoader.load({
                        userId: emailIdentity.userId,
                        query: {
                            limit: MAX_LIST_LIMIT,
                            cursor,
                        },
                    }),
                )) {
                    const excelRow = sheet.addRow({
                        ...bill,
                        location: bill.location.name,
                        receiver: bill.receiver.name,
                        consumers: bill.consumers.map((consumer) => consumer.name).join(', '),
                    });
                    excelRow.commit();
                }
            }

            await workbook.commit();
        } catch {
            stream.destroy(new Error('Export failed'));
        }
    }
}
