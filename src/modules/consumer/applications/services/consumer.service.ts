import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindConsumerByUserIdAndIdOrThrowQuery } from '@/modules/consumer/applications/queries/findConsumerByUserIdAndIdOrThrow/findConsumerByUserIdAndIdOrThrow.query';
import { FindTotalConsumersByUserIdQuery } from '@/modules/consumer/applications/queries/findTotalConsumersByUserId/findTotalConsumersByUserId.query';

import { CreateConsumerService } from './createConsumer.service';
import { DeleteConsumerService } from './deleteConsumer.service';
import { FindConsumerListByUserIdService } from './findConsumerListByUserId.service';
import { UpdateConsumerService } from './updateConsumer.service';

import type { IId } from '@/core/interfaces/id.interface';
import type { IListResult } from '@/core/interfaces/listResult.interface';
import type { ITotal } from '@/core/interfaces/total.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { FindConsumerListRequestDto } from '@/modules/consumer/interfaces/dtos/findConsumerList.request.dto';
import type { UpdateConsumerRequestDto } from '@/modules/consumer/interfaces/dtos/updateConsumer.request.dto';

@Injectable()
export class ConsumerService {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly createConsumerService: CreateConsumerService,
        private readonly updateConsumerService: UpdateConsumerService,
        private readonly deleteConsumerService: DeleteConsumerService,
        private readonly findConsumerListByUserIdService: FindConsumerListByUserIdService,
    ) {}

    create(userId: string, name: string): Promise<IId> {
        return this.createConsumerService.execute({ userId, name });
    }

    update(userId: string, body: UpdateConsumerRequestDto): Promise<IId> {
        return this.updateConsumerService.execute({ userId, body });
    }

    delete(userId: string, consumerId: string): Promise<IId> {
        return this.deleteConsumerService.execute({ userId, consumerId });
    }

    findListByUserId(
        userId: string,
        query: FindConsumerListRequestDto,
    ): Promise<IListResult<ISelectConsumer>> {
        return this.findConsumerListByUserIdService.execute({ userId, query });
    }

    findByUserIdAndId(userId: string, consumerId: string): Promise<ISelectConsumer> {
        return this.queryBus.execute<FindConsumerByUserIdAndIdOrThrowQuery, ISelectConsumer>(
            new FindConsumerByUserIdAndIdOrThrowQuery({ userId, id: consumerId }),
        );
    }

    findTotal(userId: string): Promise<ITotal> {
        return this.queryBus
            .execute<FindTotalConsumersByUserIdQuery, number>(
                new FindTotalConsumersByUserIdQuery({
                    userId,
                }),
            )
            .then((total) => ({ total }));
    }
}
