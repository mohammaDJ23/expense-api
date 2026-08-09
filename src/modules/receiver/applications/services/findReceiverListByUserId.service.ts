import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { createCursorPagination } from '@/core/utils/cursor/createCursorPagination.util';
import { parseCursor } from '@/core/utils/cursor/parseCursor.util';
import { FindReceiverListByUserIdQuery } from '@/modules/receiver/applications/queries/findReceiverListByUserId/findReceiverListByUserId.query';
import { FindTotalReceiversByUserIdQuery } from '@/modules/receiver/applications/queries/findTotalReceiversByUserId/findTotalReceiversByUserId.query';

import type { IService } from '@/core/interfaces/service.interface';
import type { IListResult } from '@/core/types/listResult.type';
import type { ICursor } from '@/core/utils/cursor/cursor.type';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import type { FindReceiverListRequestDto } from '@/modules/receiver/interfaces/dtos/findReceiverList.request.dto';

interface IInput {
    userId: string;
    query: FindReceiverListRequestDto;
}

@Injectable()
export class FindReceiverListByUserIdService implements IService<
    IInput,
    IListResult<ISelectReceiver>
> {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(input: IInput): Promise<IListResult<ISelectReceiver>> {
        const [receivers, total] = await Promise.all([
            this.queryBus.execute<FindReceiverListByUserIdQuery, ISelectReceiver[]>(
                new FindReceiverListByUserIdQuery({
                    userId: input.userId,
                    cursor: this.parseCursor(input.query.cursor),
                    limit: input.query.limit,
                }),
            ),
            this.queryBus.execute<FindTotalReceiversByUserIdQuery, number>(
                new FindTotalReceiversByUserIdQuery({
                    userId: input.userId,
                }),
            ),
        ]);

        const cursorPagination = createCursorPagination(receivers, input.query.limit);

        return {
            ...cursorPagination,
            total,
        };
    }

    parseCursor(cursor: string | null): ICursor | null {
        try {
            return parseCursor(cursor);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
