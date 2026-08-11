import { Injectable } from '@nestjs/common';
import ExcelJS from 'exceljs';

import { MAX_LIST_LIMIT } from '@/core/core.constants';
import { cursorIterator } from '@/core/utils/pagination/cursorIterator.util';

import { BillsExcelExportGeneratorService } from './billsExcelExportGenerator.service';
import { BillsExportDataLoaderService } from './billsExportDataLoader.service';

import type { IExcelExportContext } from '@/core/features/export/excelExportContext.type';
import type { IService } from '@/core/interfaces/service.interface';
import type { IListResult } from '@/core/types/list/listResult.type';
import type { IBill } from '@/modules/bill/domain/types/bill.type';
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

        this.billsExcelExportGeneratorService.createUserMetadataSheet(input.user, context.workbook);

        const sheet = this.billsExcelExportGeneratorService.createSheet(context.workbook);

        // Because of streaming the excel file, it does not need to be wait
        this.write(input.user.id, context, sheet);

        return context.stream;
    }

    private async write(
        userId: string,
        context: IExcelExportContext,
        sheet: ExcelJS.Worksheet,
    ): Promise<void> {
        try {
            for await (const bills of cursorIterator((cursor) =>
                this.cursorIterator(userId, cursor),
            )) {
                this.billsExcelExportGeneratorService.addRows(sheet, bills);
            }

            await this.billsExcelExportGeneratorService.generate(context.workbook);
        } catch {
            context.stream.destroy(new Error('Export failed'));
        }
    }

    private cursorIterator(userId: string, cursor: string | null): Promise<IListResult<IBill>> {
        return this.billsExportDataLoader.load({
            userId,
            query: {
                limit: MAX_LIST_LIMIT,
                cursor,
            },
        });
    }
}
