import { Injectable } from '@nestjs/common';

import { MAX_LIST_LIMIT } from '@/core/core.constants';
import { CursorPaginationService } from '@/core/features/pagination/cursor/cursorPagination.service';
import { BillsExportDataLoaderService } from '@/modules/bill/applications/services/export/billsExportDataLoader.service';
import { BillsExcelExportGeneratorService } from '@/modules/bill/applications/services/export/excel/billsExcelExportGenerator.service';

import type { IExcelContext } from '@/core/features/export/excel/excelContext.type';
import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';
import type { IBill } from '@/modules/bill/domain/types/bill.type';
import type { PassThrough } from 'node:stream';

@Injectable()
export class BillsExcelExportService implements IService<ISelectEmailIdentity, PassThrough> {
    constructor(
        private readonly billsExportDataLoader: BillsExportDataLoaderService,
        private readonly billsExcelExportGeneratorService: BillsExcelExportGeneratorService,
        private readonly cursorPaginationService: CursorPaginationService,
    ) {}

    execute(input: ISelectEmailIdentity): PassThrough {
        const context = this.billsExcelExportGeneratorService.initialize();

        // Because of streaming the excel file, it does not need to be wait
        this.write(input, context);

        return context.stream;
    }

    private async write(
        emailIdentity: ISelectEmailIdentity,
        context: IExcelContext,
    ): Promise<void> {
        try {
            this.billsExcelExportGeneratorService.createMetadataSheets(
                emailIdentity,
                context.workbook,
            );

            const sheet = this.billsExcelExportGeneratorService.createSheet(context.workbook);

            for await (const bills of this.cursorPaginationService.cursorIterator<IBill, string>(
                (cursor) =>
                    this.billsExportDataLoader.load({
                        userId: emailIdentity.userId,
                        query: {
                            limit: MAX_LIST_LIMIT,
                            cursor,
                        },
                    }),
            )) {
                this.billsExcelExportGeneratorService.addRows(sheet, bills);
            }

            await this.billsExcelExportGeneratorService.generate(context.workbook);
        } catch {
            context.stream.destroy(new Error('Export failed'));
        }
    }
}
