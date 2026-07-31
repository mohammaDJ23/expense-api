import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindConsumerListByUserIdQuery } from '@/modules/consumer/applications/queries/findConsumerListByUserId/findConsumerListByUserId.query';
import { FindTotalConsumersByUserIdQuery } from '@/modules/consumer/applications/queries/findTotalConsumersByUserId/findTotalConsumersByUserId.query';

import type { IService } from '@/core/interfaces/service.interface';
import type { IListResult } from '@/core/types/listResult.type';
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
                    offset: input.query.offset,
                    limit: input.query.limit,
                }),
            ),
            this.queryBus.execute<FindTotalConsumersByUserIdQuery, number>(
                new FindTotalConsumersByUserIdQuery({
                    userId: input.userId,
                }),
            ),
        ]);
        return {
            items: consumers,
            total,
        };
    }
}
