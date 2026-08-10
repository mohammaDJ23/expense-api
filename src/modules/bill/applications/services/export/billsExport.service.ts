import { Injectable } from '@nestjs/common';

import { MAX_LIST_LIMIT } from '@/core/core.constants';
import { cursorIterator } from '@/core/utils/cursor/cursorIterator.util';

import { BillsExportDataLoaderService } from './billsExportDataLoader.service';
import { BillsExportGeneratorService } from './billsExportGenerator.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IExportContext } from '@/core/types/exportContext.type';
import type { IListResult } from '@/core/types/listResult.type';
import type { IBill } from '@/modules/bill/domain/types/bill.type';
import type { PassThrough } from 'node:stream';

interface IInput {
    userId: string;
}

@Injectable()
export class BillsExportService implements IService<IInput, PassThrough> {
    constructor(
        private readonly billsExportDataLoader: BillsExportDataLoaderService,
        private readonly billsExportGeneratorService: BillsExportGeneratorService,
    ) {}

    execute(input: IInput): PassThrough {
        const context = this.billsExportGeneratorService.initialize();

        // Because of streaming the excel file, it does not need to be wait
        this.processExport(context, input);

        return context.stream;
    }

    private async processExport(context: IExportContext, input: IInput): Promise<void> {
        try {
            for await (const bills of cursorIterator((cursor) =>
                this.cursorIterator(input.userId, cursor),
            )) {
                this.billsExportGeneratorService.addRows(context, bills);
            }

            await this.billsExportGeneratorService.generate(context);
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
