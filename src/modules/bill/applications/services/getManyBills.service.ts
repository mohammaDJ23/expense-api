import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetManyBillsQuery } from '@/modules/bill/applications/queries/getManyBills/getManyBills.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';
import type { GetManyBillsQueryRequestDto } from '@/modules/bill/interface/dtos/getManyBillsQuery.request.dto';

@Injectable()
export class GetManyBillsService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(userId: string, options: GetManyBillsQueryRequestDto): Promise<TSelectBill[]> {
        try {
            const getManyBillsQuery = new GetManyBillsQuery(userId, options.offset, options.limit);
            return await this.queryBus.execute<GetManyBillsQuery, TSelectBill[]>(getManyBillsQuery);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
