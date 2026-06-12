import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateManyConsumersCommand } from '@/modules/consumer/applications/commands/createManyConsumers/createManyConsumers.command';
import { GetManyConsumersByNameQuery } from '@/modules/consumer/applications/queries/getManyConsumersByName/getManyConsumersByName.query';

import type { TSelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@Injectable()
export class ConsumerService {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    createMany(names: string[]): Promise<TSelectConsumer[]> {
        try {
            const createManyConsumersCommand = new CreateManyConsumersCommand(
                names.map((name) => ({
                    name,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })),
            );
            return this.commandBus.execute(createManyConsumersCommand);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }

    getManyByName(names: string[]): Promise<TSelectConsumer[]> {
        try {
            const getManyConsumersByNameQuery = new GetManyConsumersByNameQuery(names);
            return this.queryBus.execute<GetManyConsumersByNameQuery, TSelectConsumer[]>(
                getManyConsumersByNameQuery,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }

    getNamesToCreate(names: string[], existences: TSelectConsumer[]): string[] {
        const existencesNames = new Set(existences.map((existence) => existence.name));
        return names.filter((name) => !existencesNames.has(name));
    }
}
