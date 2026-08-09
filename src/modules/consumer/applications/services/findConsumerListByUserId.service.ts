import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { createCursorPagination } from '@/core/utils/cursor/createCursorPagination.util';
import { parseCursor } from '@/core/utils/cursor/parseCursor.util';
import { FindConsumerListByUserIdQuery } from '@/modules/consumer/applications/queries/findConsumerListByUserId/findConsumerListByUserId.query';
import { FindTotalConsumersByUserIdQuery } from '@/modules/consumer/applications/queries/findTotalConsumersByUserId/findTotalConsumersByUserId.query';

import type { IService } from '@/core/interfaces/service.interface';
import type { IListResult } from '@/core/types/listResult.type';
import type { ICursor } from '@/core/utils/cursor/cursor.type';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { FindConsumerListRequestDto } from '@/modules/consumer/interfaces/dtos/findConsumerList.request.dto';

interface IInput {
    userId: string;
    query: FindConsumerListRequestDto;
}

@Injectable()
export class FindConsumerListByUserIdService implements IService<
    IInput,
    IListResult<ISelectConsumer>
> {
    constructor(private readonly queryBus: QueryBus) {}

    async execute(input: IInput): Promise<IListResult<ISelectConsumer>> {
        const [consumers, total] = await Promise.all([
            this.queryBus.execute<FindConsumerListByUserIdQuery, ISelectConsumer[]>(
                new FindConsumerListByUserIdQuery({
                    userId: input.userId,
                    cursor: this.parseCursor(input.query.cursor),
                    limit: input.query.limit,
                }),
            ),
            this.queryBus.execute<FindTotalConsumersByUserIdQuery, number>(
                new FindTotalConsumersByUserIdQuery({
                    userId: input.userId,
                }),
            ),
        ]);

        const cursorPagination = createCursorPagination(consumers, input.query.limit);

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
