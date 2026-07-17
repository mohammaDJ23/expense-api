import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { FindConsumerByUserIdAndIdOrThrowQuery } from '@/modules/consumer/applications/queries/findConsumerByUserIdAndIdOrThrow/findConsumerByUserIdAndIdOrThrow.query';
import { FindConsumerListByUserIdQuery } from '@/modules/consumer/applications/queries/findConsumerListByUserId/findConsumerListByUserId.query';

import { CreateConsumerService } from './createConsumer.service';
import { DeleteConsumerService } from './deleteConsumer.service';
import { UpdateConsumerService } from './updateConsumer.service';

import type { IdEntity } from '@/core/entities/id.entity';
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
    ) {}

    create(userId: string, name: string): Promise<IdEntity> {
        return this.createConsumerService.execute({ userId, name });
    }

    update(userId: string, body: UpdateConsumerRequestDto): Promise<IdEntity> {
        return this.updateConsumerService.execute({ userId, body });
    }

    delete(userId: string, consumerId: string): Promise<IdEntity> {
        return this.deleteConsumerService.execute({ userId, consumerId });
    }

    findListByUserId(
        userId: string,
        query: FindConsumerListRequestDto,
    ): Promise<ISelectConsumer[]> {
        return this.queryBus.execute<FindConsumerListByUserIdQuery, ISelectConsumer[]>(
            new FindConsumerListByUserIdQuery({
                userId,
                offset: query.offset,
                limit: query.limit,
            }),
        );
    }

    findByUserIdAndId(userId: string, consumerId: string): Promise<ISelectConsumer> {
        return this.queryBus.execute<FindConsumerByUserIdAndIdOrThrowQuery, ISelectConsumer>(
            new FindConsumerByUserIdAndIdOrThrowQuery({ userId, id: consumerId }),
        );
    }
}
