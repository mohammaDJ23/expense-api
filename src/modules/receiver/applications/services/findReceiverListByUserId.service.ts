import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindReceiverListByUserIdQuery } from '@/modules/receiver/applications/queries/findReceiverListByUserId/findReceiverListByUserId.query';
import { FindTotalReceiversByUserIdQuery } from '@/modules/receiver/applications/queries/findTotalReceiversByUserId/findTotalReceiversByUserId.query';

import type { IService } from '@/core/interfaces/service.interface';
import type { IListResult } from '@/core/types/listResult.interface';
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
                    offset: input.query.offset,
                    limit: input.query.limit,
                }),
            ),
            this.queryBus.execute<FindTotalReceiversByUserIdQuery, number>(
                new FindTotalReceiversByUserIdQuery({
                    userId: input.userId,
                }),
            ),
        ]);
        return {
            items: receivers,
            total,
        };
    }
}
