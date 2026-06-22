import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindUserConsumerTargetsByRefIdQuery } from '@/modules/consumer/applications/queries/findUserConsumerTargetsByRefId/findUserConsumerTargetsByRefId.query';

import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { FindUserConsumerTargetsRequestDto } from '@/modules/consumer/interfaces/dtos/findUserConsumerTargets.request.dto';

@Injectable()
export class UserConsumerService {
    constructor(private readonly queryBus: QueryBus) {}

    findTargetsByRefId(
        userId: string,
        query: FindUserConsumerTargetsRequestDto,
    ): Promise<ISelectConsumer[]> {
        return this.queryBus.execute<FindUserConsumerTargetsByRefIdQuery, ISelectConsumer[]>(
            new FindUserConsumerTargetsByRefIdQuery(userId, query.offset, query.limit),
        );
    }
}
