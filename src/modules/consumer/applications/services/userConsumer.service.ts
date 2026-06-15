import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateManyUsersConsumersCommand } from '@/modules/consumer/applications/commands/createManyUsersConsumers/createManyUsersConsumers.command';
import { GetManyUsersConsumersByIdQuery } from '@/modules/consumer/applications/queries/getManyUsersConsumersById/getManyUsersConsumersById.query';

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
            const createManyUsersConsumersCommand = new CreateManyUsersConsumersCommand(
                consumerIds.map((consumerId) => ({
                    userId,
                    consumerId,
                    createdAt: getCurrentUTCTimestamp(),
                })),
            );
            return this.commandBus.execute<CreateManyUsersConsumersCommand, TSelectUserConsumer[]>(
                createManyUsersConsumersCommand,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }

    getManyById(userId: string, consumerIds: string[]): Promise<TSelectUserConsumer[]> {
        try {
            const getManyUsersConsumersByIdQuery = new GetManyUsersConsumersByIdQuery(
                userId,
                consumerIds,
            );
            return this.queryBus.execute<GetManyUsersConsumersByIdQuery, TSelectUserConsumer[]>(
                getManyUsersConsumersByIdQuery,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }

    async createManyIfNotExists(userId: string, consumers: TSelectConsumer[]): Promise<void> {
        const ids = consumers.map((consumer) => consumer.id);
        const existences = await this.getManyById(userId, ids);
        const existencesIds = new Set(existences.map((existence) => existence.consumerId));
        const idsToCreate = ids.filter((id) => !existencesIds.has(id));
        if (idsToCreate.length > 0) {
            await this.createMany(userId, idsToCreate);
        }
    }
}
