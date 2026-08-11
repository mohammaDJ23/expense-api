import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import pLimit from 'p-limit';

import { MAX_LIST_LIMIT } from '@/core/core.constants';
import { EXCEL_FILE_CONTENT_TYPE } from '@/core/features/export/excel/excel.constants';
import { cursorIterator } from '@/core/utils/pagination/cursorIterator.util';
import { BillsExcelExportService } from '@/modules/bill/applications/services/export/excel/billsExcelExport.service';
import { getBillsExcelFilename } from '@/modules/bill/applications/services/export/excel/billsExcelExport.utils';
import { FindUserListService } from '@/modules/user/applications/services/findUserList.service';

import { BillsExportMailerService } from './billsExportMailer.service';

import type { IJob } from '@/core/interfaces/job.interface';
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
        for await (const users of cursorIterator((cursor) =>
            this.findUserListService.execute({
                query: {
                    limit: MAX_LIST_LIMIT,
                    cursor,
                },
            }),
        )) {
            await Promise.allSettled(users.map((user) => this.processExport(user)));
        }
    }

    private async processExport(user: ISelectUser): Promise<void> {
        await this.concurrency(async () => {
            const stream = this.billsExcelExportService.execute({ user });

            await this.billsExportMailerService.execute({
                email: user.email,
                attachments: [
                    {
                        filename: getBillsExcelFilename(),
                        content: stream,
                        contentType: EXCEL_FILE_CONTENT_TYPE,
                    },
                ],
            });
        });
    }
}
