import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import pLimit from 'p-limit';

import { MAX_LIST_LIMIT } from '@/core/core.constants';
import { EXCEL_FILE_CONTENT_TYPE } from '@/core/features/excelFile/excelFile.constants';
import { cursorIterator } from '@/core/utils/pagination/cursorIterator.util';
import { FindUserListService } from '@/modules/user/applications/services/findUserList.service';

import { BillsExcelExportService } from './billsExcelExport.service';
import { BILL_EXPORT_FILE_NAME } from './billsExport.constants';
import { BillsExportMailerService } from './billsExportMailer.service';

import type { IJob } from '@/core/interfaces/job.interface';
import type { IListResult } from '@/core/types/listResult.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class BillsExportJob implements IJob {
    private readonly concurrency = pLimit(3);

    constructor(
        private readonly billsExcelExportService: BillsExcelExportService,
        private readonly billsExportMailerService: BillsExportMailerService,
        private readonly findUserListService: FindUserListService,
    ) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async run(): Promise<void> {
        for await (const users of cursorIterator((cursor) => this.cursorIterator(cursor))) {
            await Promise.allSettled(users.map((user) => this.processExport(user)));
        }
    }

    private cursorIterator(cursor: string | null): Promise<IListResult<ISelectUser>> {
        return this.findUserListService.execute({
            query: {
                limit: MAX_LIST_LIMIT,
                cursor,
            },
        });
    }

    private async processExport(user: ISelectUser): Promise<void> {
        await this.concurrency(async () => {
            const stream = this.billsExcelExportService.execute({
                userId: user.id,
            });

            await this.billsExportMailerService.execute({
                email: user.email,
                attachments: [
                    {
                        filename: BILL_EXPORT_FILE_NAME,
                        content: stream,
                        contentType: EXCEL_FILE_CONTENT_TYPE,
                    },
                ],
            });
        });
    }
}
