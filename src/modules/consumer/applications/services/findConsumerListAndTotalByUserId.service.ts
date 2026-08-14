import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindTotalConsumersByUserIdQuery } from '@/modules/consumer/applications/queries/findTotalConsumersByUserId/findTotalConsumersByUserId.query';

import { FindConsumerListByUserIdService } from './findConsumerListByUserId.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IListResultWithTotal } from '@/core/types/list/listResultWithTotal.type';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { FindConsumerListRequestDto } from '@/modules/consumer/interfaces/dtos/findConsumerList.request.dto';

interface IInput {
    userId: string;
    query: FindConsumerListRequestDto;
}

@Injectable()
export class FindConsumerListAndTotalByUserIdService implements IService<
    IInput,
    IListResultWithTotal<ISelectConsumer>
> {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly findConsumerListByUserIdService: FindConsumerListByUserIdService,
    ) {}

    async execute(input: IInput): Promise<IListResultWithTotal<ISelectConsumer>> {
        const [consumerList, total] = await Promise.all([
            this.findConsumerListByUserIdService.execute(input),
            this.queryBus.execute<FindTotalConsumersByUserIdQuery, number>(
                new FindTotalConsumersByUserIdQuery({
                    userId: input.userId,
                }),
            ),
        ]);

        return {
            ...consumerList,
            total,
        };
    }
}
