import { Injectable } from '@nestjs/common';

import { CreateManyConsumersService } from './createManyConsumers.service';
import { GetManyConsumersByNameService } from './getManyConsumersByName.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@Injectable()
export class GetManyConsumersByNameOrCreateService implements IServiceHandler {
    constructor(
        private readonly createManyConsumersService: CreateManyConsumersService,
        private readonly getManyConsumersByNameService: GetManyConsumersByNameService,
    ) {}

    async execute(names: string[]): Promise<TSelectConsumer[]> {
        const existences = await this.getManyConsumersByNameService.execute(names);
        const existencesNames = new Set(existences.map((existence) => existence.name));
        const namesToCreate = names.filter((name) => !existencesNames.has(name));
        if (namesToCreate.length > 0) {
            const created = await this.createManyConsumersService.execute(namesToCreate);
            return created.concat(existences);
        }
        return existences;
    }
}
