import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Cron, CronExpression } from '@nestjs/schedule';
import pLimit from 'p-limit';

import { BillsExportService } from './billsExport.service';
import { BillsExportMailerService } from './billsExportMailer.service';

import type { IJob } from '@/core/interfaces/job.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

const limit = pLimit(5);

@Injectable()
export class BillsExportJob implements IJob {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly billsExportService: BillsExportService,
        private readonly billsExportMailerService: BillsExportMailerService,
    ) {}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async run(): Promise<void> {
        const users = await this.queryBus.execute<FindManyUsersQuery, ISelectUser[]>(
            new FindManyUsersQuery(),
        );

        await Promise.allSettled(
            users.map((user) =>
                limit(async () => {
                    const buffer = await this.billsExportService.execute({
                        userId: user.id,
                    });
                    await this.billsExportMailerService.execute({
                        email: user.email,
                        buffer,
                    });
                }),
            ),
        );
    }
}
