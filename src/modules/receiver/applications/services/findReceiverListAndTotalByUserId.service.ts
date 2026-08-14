import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindTotalReceiversByUserIdQuery } from '@/modules/receiver/applications/queries/findTotalReceiversByUserId/findTotalReceiversByUserId.query';

import { FindReceiverListByUserIdService } from './findReceiverListByUserId.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IListResultWithTotal } from '@/core/types/list/listResultWithTotal.type';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import type { FindReceiverListRequestDto } from '@/modules/receiver/interfaces/dtos/findReceiverList.request.dto';

interface IInput {
    userId: string;
    query: FindReceiverListRequestDto;
}

@Injectable()
export class FindReceiverListAndTotalByUserIdService implements IService<
    IInput,
    IListResultWithTotal<ISelectReceiver>
> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly findReceiverListByUserIdService: FindReceiverListByUserIdService,
    ) {}

    async execute(input: IInput): Promise<IListResultWithTotal<ISelectReceiver>> {
        const [receiverList, total] = await Promise.all([
            this.findReceiverListByUserIdService.execute(input),
            this.queryBus.execute<FindTotalReceiversByUserIdQuery, number>(
                new FindTotalReceiversByUserIdQuery({
                    userId: input.userId,
                }),
            ),
        ]);

        return {
            ...receiverList,
            total,
        };
    }
}
