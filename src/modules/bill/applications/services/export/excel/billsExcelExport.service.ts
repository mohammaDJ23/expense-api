import { Injectable } from '@nestjs/common';
import ExcelJS from 'exceljs';

import { MAX_LIST_LIMIT } from '@/core/core.constants';
import { cursorIterator } from '@/core/utils/pagination/cursorIterator.util';
import { BillsExportDataLoaderService } from '@/modules/bill/applications/services/export/billsExportDataLoader.service';
import { BillsExcelExportGeneratorService } from '@/modules/bill/applications/services/export/excel/billsExcelExportGenerator.service';

import type { IExcelContext } from '@/core/features/export/excel/excelContext.type';
import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';
import type { PassThrough } from 'node:stream';

interface IInput {
    user: ISelectUser;
}

@Injectable()
export class BillsExcelExportService implements IService<IInput, PassThrough> {
    constructor(
        private readonly billsExportDataLoader: BillsExportDataLoaderService,
        private readonly billsExcelExportGeneratorService: BillsExcelExportGeneratorService,
    ) {}

    execute(input: IInput): PassThrough {
        const context = this.billsExcelExportGeneratorService.initialize();

        this.billsExcelExportGeneratorService.createMetadataSheets(input.user, context.workbook);

        const sheet = this.billsExcelExportGeneratorService.createSheet(context.workbook);

        // Because of streaming the excel file, it does not need to be wait
        this.write(input.user.id, context, sheet);

        return context.stream;
    }

    private async write(
        userId: string,
        context: IExcelContext,
        sheet: ExcelJS.Worksheet,
    ): Promise<void> {
        try {
            for await (const bills of cursorIterator((cursor) =>
                this.billsExportDataLoader.load({
                    userId,
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
