import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { BillsExportService } from './billsExport.service';

import type { IJob } from '@/core/interfaces/job.interface';

@Injectable()
export class BillsExportJob implements IJob {
    constructor(private readonly billsExportService: BillsExportService) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async run(): Promise<void> {
        await this.billsExportService.execute({
            userId: '',
        });
    }
}
