import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindUserConsumerTargetByRefIdAndTargetIdOrThrowQuery } from '@/modules/consumer/applications/queries/findUserConsumerTargetByRefIdAndTargetIdOrThrow/findUserConsumerTargetByRefIdAndTargetIdOrThrow.query';
import { FindUserConsumerTargetListByRefIdQuery } from '@/modules/consumer/applications/queries/findUserConsumerTargetListByRefId/findUserConsumerTargetListByRefId.query';

import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { FindUserConsumerTargetsRequestDto } from '@/modules/consumer/interfaces/dtos/findUserConsumerTargets.request.dto';

@Injectable()
export class UserConsumerService {
    constructor(private readonly queryBus: QueryBus) {}

    findTargetListByRefId(
        userId: string,
        query: FindUserConsumerTargetsRequestDto,
    ): Promise<ISelectConsumer[]> {
        return this.queryBus.execute<FindUserConsumerTargetListByRefIdQuery, ISelectConsumer[]>(
            new FindUserConsumerTargetListByRefIdQuery(userId, query.offset, query.limit),
        );
    }

    findTargetByRefIdAndTargetId(userId: string, consumerId: string): Promise<ISelectConsumer> {
        return this.queryBus.execute<
            FindUserConsumerTargetByRefIdAndTargetIdOrThrowQuery,
            ISelectConsumer
        >(new FindUserConsumerTargetByRefIdAndTargetIdOrThrowQuery(userId, consumerId));
    }
}
