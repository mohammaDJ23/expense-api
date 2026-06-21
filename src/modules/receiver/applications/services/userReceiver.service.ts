import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindUserReceiverTargetsByRefIdQuery } from '@/modules/receiver/applications/queries/findUserReceiverTargetsByRefId/findUserReceiverTargetsByRefId.query';

import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import type { FindUserReceiverTargetsRequestDto } from '@/modules/receiver/interfaces/dtos/findUserReceiverTargets.request.dto';

@Injectable()
export class UserReceiverService {
    constructor(private readonly queryBus: QueryBus) {}

    findTargetsByRefId(
        userId: string,
        query: FindUserReceiverTargetsRequestDto,
    ): Promise<ISelectReceiver[]> {
        return this.queryBus.execute<FindUserReceiverTargetsByRefIdQuery, ISelectReceiver[]>(
            new FindUserReceiverTargetsByRefIdQuery(userId, query.offset, query.limit),
        );
    }
}
