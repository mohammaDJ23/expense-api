import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetManyBillsQuery } from '@/modules/bill/applications/queries/getManyBills/getManyBills.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { IBill } from '@/modules/bill/domain/interfaces/bill.interface';
import type { GetManyBillsRequestDto } from '@/modules/bill/interface/dtos/getManyBills.request.dto';

@Injectable()
export class GetManyBillsService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(userId: string, options: GetManyBillsRequestDto): Promise<IBill[]> {
        try {
            const getManyBillsQuery = new GetManyBillsQuery(userId, options.offset, options.limit);
            return await this.queryBus.execute<GetManyBillsQuery, IBill[]>(getManyBillsQuery);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
