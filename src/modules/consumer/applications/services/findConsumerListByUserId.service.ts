import { Injectable } from '@nestjs/common';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CursorPaginationService } from '@/core/features/pagination/cursor/cursorPagination.service';
import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { ConsumerListCursorPaginationDefinition } from '@/modules/consumer/applications/pagination/cursor/consumerListCursorPagination.definition';
import { FindConsumerListByUserIdQuery } from '@/modules/consumer/applications/queries/findConsumerListByUserId/findConsumerListByUserId.query';

import type { IService } from '@/core/interfaces/service.interface';
import type { IListResult } from '@/core/types/list/listResult.type';
import type { IConsumerListCursor } from '@/modules/consumer/domain/types/consumerListCursor.type';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { FindConsumerListRequestDto } from '@/modules/consumer/interfaces/dtos/findConsumerList.request.dto';

interface IInput {
    userId: string;
    query: FindConsumerListRequestDto;
}

@Injectable()
export class FindConsumerListByUserIdService implements IService<
    IInput,
    IListResult<ISelectConsumer, string>
> {
    constructor(
        private readonly queryDispatcher: QueryDispatcher,
        private readonly cursorPaginationService: CursorPaginationService,
        private readonly consumerListCursorPaginationDefinition: ConsumerListCursorPaginationDefinition,
    ) {}

    async execute(input: IInput): Promise<IListResult<ISelectConsumer, string>> {
        const consumers = await this.queryDispatcher.execute<
            FindConsumerListByUserIdQuery,
            ISelectConsumer[]
        >(
            new FindConsumerListByUserIdQuery({
                userId: input.userId,
                cursor: this.parseCursor(input.query.cursor),
                limit: input.query.limit,
            }),
        );

        return this.cursorPaginationService.paginate(
            consumers,
            input.query.limit,
            this.consumerListCursorPaginationDefinition,
        );
    }

    private parseCursor(cursor: string | null): IConsumerListCursor | null {
        try {
            return this.cursorPaginationService.decode(
                cursor,
                this.consumerListCursorPaginationDefinition,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
