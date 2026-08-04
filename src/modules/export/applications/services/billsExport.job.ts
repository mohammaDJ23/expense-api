import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Cron, CronExpression } from '@nestjs/schedule';

import { FindManyUsersQuery } from '@/modules/user/applications/queries/findManyUsers/findManyUsers.query';

import { BillsExportService } from './billsExport.service';
import { BillsExportMailerService } from './billsExportMailer.service';

import type { IJob } from '@/core/interfaces/job.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class BillsExportJob implements IJob {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly billsExportService: BillsExportService,
        private readonly billsExportMailerService: BillsExportMailerService,
    ) {}

    @Cron(CronExpression.EVERY_MINUTE)
    async run(): Promise<void> {
        const users = await this.queryBus.execute<FindManyUsersQuery, ISelectUser[]>(
            new FindManyUsersQuery(),
        );

        await Promise.allSettled(
            users.map(async (user) => {
                const buffer = await this.billsExportService.execute({
                    userId: user.id,
                });

                await this.billsExportMailerService.execute({
                    email: user.email,
                    buffer,
                });
            }),
        );
    }
}
