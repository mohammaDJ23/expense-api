import { Injectable } from '@nestjs/common';

import { CreateManyUsersConsumersService } from './createManyUsersConsumers.service';
import { GetManyUsersConsumersByIdService } from './getManyUsersConsumersById.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@Injectable()
export class CreateManyUsersConsumersIfNotExistsService implements IServiceHandler {
    constructor(
        private readonly createManyUsersConsumersService: CreateManyUsersConsumersService,
        private readonly getManyUsersConsumersByIdService: GetManyUsersConsumersByIdService,
    ) {}

    async execute(userId: string, consumers: TSelectConsumer[]): Promise<void> {
        const ids = consumers.map((consumer) => consumer.id);
        const existences = await this.getManyUsersConsumersByIdService.execute(userId, ids);
        const existencesIds = new Set(existences.map((existence) => existence.consumerId));
        const idsToCreate = ids.filter((id) => !existencesIds.has(id));
        if (idsToCreate.length > 0) {
            await this.createManyUsersConsumersService.execute(userId, idsToCreate);
        }
    }
}
