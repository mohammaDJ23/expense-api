import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindReceiverByUserIdAndIdOrThrowQuery } from '@/modules/receiver/applications/queries/findReceiverByUserIdAndIdOrThrow/findReceiverByUserIdAndIdOrThrow.query';
import { FindReceiverListByUserIdQuery } from '@/modules/receiver/applications/queries/findReceiverListByUserId/findReceiverListByUserId.query';

import { CreateReceiverService } from './createReceiver.service';
import { DeleteReceiverService } from './deleteReceiver.service';
import { UpdateReceiverService } from './updateReceiver.service';

import type { IdEntity } from '@/core/entities/id.entity';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import type { FindReceiverListRequestDto } from '@/modules/receiver/interfaces/dtos/findReceiverList.request.dto';
import type { UpdateReceiverRequestDto } from '@/modules/receiver/interfaces/dtos/updateReceiver.request.dto';

@Injectable()
export class ReceiverService {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly createReceiverService: CreateReceiverService,
        private readonly updateReceiverService: UpdateReceiverService,
        private readonly deleteReceiverService: DeleteReceiverService,
    ) {}

    create(userId: string, name: string): Promise<IdEntity> {
        return this.createReceiverService.execute(userId, name);
    }

    update(userId: string, data: UpdateReceiverRequestDto): Promise<IdEntity> {
        return this.updateReceiverService.execute(userId, data);
    }

    delete(userId: string, receiverId: string): Promise<IdEntity> {
        return this.deleteReceiverService.execute(userId, receiverId);
    }

    findListByUserId(userId: string, data: FindReceiverListRequestDto): Promise<ISelectReceiver[]> {
        return this.queryBus.execute<FindReceiverListByUserIdQuery, ISelectReceiver[]>(
            new FindReceiverListByUserIdQuery(userId, data.offset, data.limit),
        );
    }

    findByUserIdAndId(userId: string, receiverId: string): Promise<ISelectReceiver> {
        return this.queryBus.execute<FindReceiverByUserIdAndIdOrThrowQuery, ISelectReceiver>(
            new FindReceiverByUserIdAndIdOrThrowQuery(userId, receiverId),
        );
    }
}
