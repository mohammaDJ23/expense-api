import { Injectable } from '@nestjs/common';

import { QueryDispatcher } from '@/core/features/queryDispatcher/query.dispatcher';
import { FindReceiverByUserIdAndIdOrThrowQuery } from '@/modules/receiver/applications/queries/findReceiverByUserIdAndIdOrThrow/findReceiverByUserIdAndIdOrThrow.query';
import { FindTotalReceiversByUserIdQuery } from '@/modules/receiver/applications/queries/findTotalReceiversByUserId/findTotalReceiversByUserId.query';

import { CreateReceiverService } from './createReceiver.service';
import { DeleteReceiverService } from './deleteReceiver.service';
import { FindReceiverListAndTotalByUserIdService } from './findReceiverListAndTotalByUserId.service';
import { ReceiverSearchQueryService } from './receiverSearchQuery.service';
import { UpdateReceiverService } from './updateReceiver.service';

import type { IId } from '@/core/types/id.type';
import type { IListResultWithTotal } from '@/core/types/list/listResultWithTotal.type';
import type { ITotal } from '@/core/types/total.type';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import type { FindReceiverListRequestDto } from '@/modules/receiver/interfaces/dtos/findReceiverList.request.dto';
import type { ReceiverSearchRequestDto } from '@/modules/receiver/interfaces/dtos/receiverSearch.request.dto';
import type { UpdateReceiverRequestDto } from '@/modules/receiver/interfaces/dtos/updateReceiver.request.dto';

@Injectable()
export class ReceiverService {
    constructor(
        private readonly queryDispatcher: QueryDispatcher,
        private readonly createReceiverService: CreateReceiverService,
        private readonly updateReceiverService: UpdateReceiverService,
        private readonly deleteReceiverService: DeleteReceiverService,
        private readonly findReceiverListAndTotalByUserIdService: FindReceiverListAndTotalByUserIdService,
        private readonly receiverSearchQueryService: ReceiverSearchQueryService,
    ) {}

    create(userId: string, name: string): Promise<IId> {
        return this.createReceiverService.execute({ userId, name });
    }

    update(userId: string, body: UpdateReceiverRequestDto): Promise<IId> {
        return this.updateReceiverService.execute({ userId, body });
    }

    delete(userId: string, receiverId: string): Promise<IId> {
        return this.deleteReceiverService.execute({ userId, receiverId });
    }

    findListByUserId(
        userId: string,
        query: FindReceiverListRequestDto,
    ): Promise<IListResultWithTotal<ISelectReceiver, string>> {
        return this.findReceiverListAndTotalByUserIdService.execute({ userId, query });
    }

    findByUserIdAndId(userId: string, receiverId: string): Promise<ISelectReceiver> {
        return this.queryDispatcher.execute<FindReceiverByUserIdAndIdOrThrowQuery, ISelectReceiver>(
            new FindReceiverByUserIdAndIdOrThrowQuery({ userId, id: receiverId }),
        );
    }

    findTotal(userId: string): Promise<ITotal> {
        return this.queryDispatcher
            .execute<FindTotalReceiversByUserIdQuery, number>(
                new FindTotalReceiversByUserIdQuery({
                    userId,
                }),
            )
            .then((total) => ({ total }));
    }

    search(userId: string, query: ReceiverSearchRequestDto): Promise<ISelectReceiver[]> {
        return this.receiverSearchQueryService.execute({
            userId,
            limit: query.limit,
            q: query.q,
        });
    }
}
