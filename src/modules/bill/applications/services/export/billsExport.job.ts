import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import pLimit from 'p-limit';

import { MAX_LIST_LIMIT } from '@/core/core.constants';
import { EXCEL_FILE_CONTENT_TYPE } from '@/core/features/export/excel/excel.constants';
import { CursorPaginationService } from '@/core/features/pagination/cursor/cursorPagination.service';
import { FindEmailIdentityListService } from '@/modules/authentication/applications/services/findEmailIdentityList.service';
import { BillsExcelExportService } from '@/modules/bill/applications/services/export/excel/billsExcelExport.service';
import { getBillsExcelFilename } from '@/modules/bill/applications/services/export/excel/billsExcelExport.utils';

import { BillsExportMailerService } from './billsExportMailer.service';

import type { IJob } from '@/core/interfaces/job.interface';
import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';

@Injectable()
export class BillsExportJob implements IJob {
    private readonly concurrency = pLimit(3);

    constructor(
        private readonly billsExcelExportService: BillsExcelExportService,
        private readonly billsExportMailerService: BillsExportMailerService,
        private readonly findEmailIdentityListService: FindEmailIdentityListService,
        private readonly cursorPaginationService: CursorPaginationService,
    ) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async run(): Promise<void> {
        for await (const emailIdentities of this.cursorPaginationService.cursorIterator<
            ISelectEmailIdentity,
            string
        >((cursor) =>
            this.findEmailIdentityListService.execute({
                limit: MAX_LIST_LIMIT,
                cursor,
            }),
        )) {
            await Promise.allSettled(
                emailIdentities.map((emailIdentity) => this.processExport(emailIdentity)),
            );
        }
    }

    private async processExport(emailIdentity: ISelectEmailIdentity): Promise<void> {
        await this.concurrency(async () => {
            const stream = this.billsExcelExportService.execute(emailIdentity);

            await this.billsExportMailerService.execute({
                email: emailIdentity.email,
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
