import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { GetBillByIdOrThrowQuery } from '@/modules/bill/applications/queries/getBillByIdOrThrow/getBillByIdOrThrow.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@Injectable()
export class GetBillByIdOrThrowService implements IServiceHandler {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(userId: string, billId: string): Promise<TSelectBill> {
        try {
            const getBillByIdOrThrowQuery = new GetBillByIdOrThrowQuery(userId, billId);
            return await this.queryBus.execute<GetBillByIdOrThrowQuery, TSelectBill>(
                getBillByIdOrThrowQuery,
            );
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
