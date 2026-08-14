import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { cursorPagination } from '@/core/utils/pagination/cursorPagination.util';
import { parseCursor } from '@/core/utils/pagination/parseCursor.util';
import { FindConsumerListByUserIdQuery } from '@/modules/consumer/applications/queries/findConsumerListByUserId/findConsumerListByUserId.query';

import type { IService } from '@/core/interfaces/service.interface';
import type { IListResult } from '@/core/types/list/listResult.type';
import type { ICursor } from '@/core/utils/pagination/cursor.type';
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
        const consumers = await this.queryBus.execute<
            FindConsumerListByUserIdQuery,
            ISelectConsumer[]
        >(
            new FindConsumerListByUserIdQuery({
                userId: input.userId,
                cursor: this.parseCursor(input.query.cursor),
                limit: input.query.limit,
            }),
        );

        return cursorPagination(consumers, input.query.limit);
    }

    parseCursor(cursor: string | null): ICursor | null {
        try {
            return parseCursor(cursor);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
