import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateManyUserConsumerCommand } from '@/modules/consumer/applications/commands/createManyUserConsumer/createManyUserConsumer.command';
import { GetManyUserConsumerByIdQuery } from '@/modules/consumer/applications/queries/getManyUserConsumerById/getManyUserConsumerById.query';

import type { TSelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { TSelectUserConsumer } from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

@Injectable()
export class UserConsumerService {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    createMany(userId: string, consumerIds: string[]): Promise<TSelectUserConsumer[]> {
        try {
            const createManyUserConsumerCommand = new CreateManyUserConsumerCommand(
                consumerIds.map((consumerId) => ({
                    userId,
                    consumerId,
                    createdAt: new Date(),
                })),
            );
            return this.commandBus.execute<CreateManyUserConsumerCommand, TSelectUserConsumer[]>(
                createManyUserConsumerCommand,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }

    getManyById(userId: string, consumerIds: string[]): Promise<TSelectUserConsumer[]> {
        try {
            const getManyConsumersByNameQuery = new GetManyUserConsumerByIdQuery(
                userId,
                consumerIds,
            );
            return this.queryBus.execute<GetManyUserConsumerByIdQuery, TSelectUserConsumer[]>(
                getManyConsumersByNameQuery,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }

    async getOrCreateMany(
        userId: string,
        consumers: TSelectConsumer[],
    ): Promise<TSelectUserConsumer[]> {
        const ids = consumers.map((consumer) => consumer.id);
        const existences = await this.getManyById(userId, ids);
        const existencesIds = new Set(existences.map((existence) => existence.consumerId));
        const idsToCreate = ids.filter((id) => !existencesIds.has(id));
        if (idsToCreate.length > 0) {
            const created = await this.createMany(userId, idsToCreate);
            return existences.concat(created);
        }
        return existences;
    }
}
