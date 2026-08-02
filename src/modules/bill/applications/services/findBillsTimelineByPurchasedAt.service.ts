import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindBillsPeriodByPurchasedAtQuery } from '@/modules/bill/applications/queries/findBillsPeriodByPurchasedAt/findBillsPeriodByPurchasedAt.query';
import { FindBillsTimelineByPurchasedAtQuery } from '@/modules/bill/applications/queries/findBillsTimelineByPurchasedAt/findBillsTimelineByPurchasedAt.query';

import type { IService } from '@/core/interfaces/service.interface';
import type { IBillPeriod } from '@/modules/bill/domain/types/billPeriod.type';
import type { IBillTimeline } from '@/modules/bill/domain/types/billTimeline.type';

interface IInput {
    userId: string;
    start: string | null;
    end: string | null;
    clientTimezone: string;
}

@Injectable()
export class FindBillsTimelineByPurchasedAtService implements IService<IInput, IBillTimeline[]> {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(input: IInput): Promise<IBillTimeline[]> {
        const period = await this.queryBus.execute<FindBillsPeriodByPurchasedAtQuery, IBillPeriod>(
            new FindBillsPeriodByPurchasedAtQuery({
                userId: input.userId,
            }),
        );

        if (!period.start || !period.end) {
            return [];
        }

        if (!input.start) {
            input.start = period.start;
        }

        if (!input.end) {
            input.end = period.end;
        }

        {
            const startInputDate = new Date(input.start);
            const startPeriodDate = new Date(period.start);
            if (startInputDate < startPeriodDate) {
                input.start = period.start;
            }
        }

        {
            const endInputDate = new Date(input.end);
            const endPeriodDate = new Date(period.end);
            if (endInputDate > endPeriodDate) {
                input.end = period.end;
            }
        }

        return this.queryBus.execute<FindBillsTimelineByPurchasedAtQuery, IBillTimeline[]>(
            new FindBillsTimelineByPurchasedAtQuery({
                userId: input.userId,
                start: input.start,
                end: input.end,
                clientTimezone: input.clientTimezone,
            }),
        );
    }
}
