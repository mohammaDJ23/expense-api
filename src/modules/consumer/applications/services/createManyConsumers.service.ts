import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateManyConsumersCommand } from '@/modules/consumer/applications/commands/createManyConsumers/createManyConsumers.command';
import { GetManyConsumersByNameQuery } from '@/modules/consumer/applications/queries/getManyConsumersByName/getManyConsumersByName.query';

import type { TSelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@Injectable()
export class CreateManyConsumersService {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    async createMany(names: string[]): Promise<TSelectConsumer[]> {
        try {
            const getManyConsumersByNameQuery = new GetManyConsumersByNameQuery(names);
            const existences = await this.queryBus.execute<
                GetManyConsumersByNameQuery,
                TSelectConsumer[]
            >(getManyConsumersByNameQuery);

            const existencesNames = new Set(existences.map((existence) => existence.name));
            const namesToCreate = names.filter((name) => !existencesNames.has(name));

            if (namesToCreate.length > 0) {
                const createManyConsumersCommand = new CreateManyConsumersCommand(
                    namesToCreate.map((name) => ({
                        name,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    })),
                );
                const createdConsumers = await this.commandBus.execute(createManyConsumersCommand);

                return existences.concat(createdConsumers);
            }

            return existences;
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
