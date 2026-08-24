import { Injectable } from '@nestjs/common';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CursorPaginationService } from '@/core/features/pagination/cursor/cursorPagination.service';
import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { ReceiverListCursorPaginationDefinition } from '@/modules/receiver/applications/pagination/cursor/receiverListCursorPagination.definition';
import { FindReceiverListByUserIdQuery } from '@/modules/receiver/applications/queries/findReceiverListByUserId/findReceiverListByUserId.query';

import type { IService } from '@/core/interfaces/service.interface';
import type { IListResult } from '@/core/types/list/listResult.type';
import type { IReceiverListCursor } from '@/modules/receiver/domain/types/receiverListCursor.type';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import type { FindReceiverListRequestDto } from '@/modules/receiver/interfaces/dtos/findReceiverList.request.dto';

interface IInput {
    userId: string;
    query: FindReceiverListRequestDto;
}

@Injectable()
export class FindReceiverListByUserIdService implements IService<
    IInput,
    IListResult<ISelectReceiver, string>
> {
    constructor(
        private readonly queryDispatcher: QueryDispatcher,
        private readonly cursorPaginationService: CursorPaginationService,
        private readonly receiverListCursorPaginationDefinition: ReceiverListCursorPaginationDefinition,
    ) {}

    async execute(input: IInput): Promise<IListResult<ISelectReceiver, string>> {
        const receivers = await this.queryDispatcher.execute<
            FindReceiverListByUserIdQuery,
            ISelectReceiver[]
        >(
            new FindReceiverListByUserIdQuery({
                userId: input.userId,
                cursor: this.parseCursor(input.query.cursor),
                limit: input.query.limit,
            }),
        );

        return this.cursorPaginationService.paginate(
            receivers,
            input.query.limit,
            this.receiverListCursorPaginationDefinition,
        );
    }

    private parseCursor(cursor: string | null): IReceiverListCursor | null {
        try {
            return this.cursorPaginationService.decode(
                cursor,
                this.receiverListCursorPaginationDefinition,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
