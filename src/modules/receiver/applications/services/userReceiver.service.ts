import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindUserReceiverTargetByRefIdAndTargetIdOrThrowQuery } from '@/modules/receiver/applications/queries/findUserReceiverTargetByRefIdAndTargetIdOrThrow/findUserReceiverTargetByRefIdAndTargetIdOrThrow.query';
import { FindUserReceiverTargetListByRefIdQuery } from '@/modules/receiver/applications/queries/findUserReceiverTargetListByRefId/findUserReceiverTargetListByRefId.query';

import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import type { FindUserReceiverTargetsRequestDto } from '@/modules/receiver/interfaces/dtos/findUserReceiverTargets.request.dto';

@Injectable()
export class UserReceiverService {
    constructor(private readonly queryBus: QueryBus) {}

    findTargetListByRefId(
        userId: string,
        query: FindUserReceiverTargetsRequestDto,
    ): Promise<ISelectReceiver[]> {
        return this.queryBus.execute<FindUserReceiverTargetListByRefIdQuery, ISelectReceiver[]>(
            new FindUserReceiverTargetListByRefIdQuery(userId, query.offset, query.limit),
        );
    }

    findTargetByRefIdAndTargetId(userId: string, receiverId: string): Promise<ISelectReceiver> {
        return this.queryBus.execute<
            FindUserReceiverTargetByRefIdAndTargetIdOrThrowQuery,
            ISelectReceiver
        >(new FindUserReceiverTargetByRefIdAndTargetIdOrThrowQuery(userId, receiverId));
    }
}
