import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { CreateConsumerCommand } from '@/modules/consumer/applications/commands/createConsumer/createConsumer.command';
import { CreateUserConsumerCommand } from '@/modules/consumer/applications/commands/createUserConsumer/createUserConsumer.command';
import { FindConsumerByNameOrNullQuery } from '@/modules/consumer/applications/queries/findConsumerByNameOrNull/findConsumerByNameOrNull.query';
import { FindUserConsumerByRefIdAndTargetIdOrNullQuery } from '@/modules/consumer/applications/queries/findUserConsumerByRefIdAndTargetIdOrNull/findUserConsumerByRefIdAndTargetIdOrNull.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { ISelectUserConsumer } from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

@Injectable()
export class CreateConsumerService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    @Transactional()
    async execute(userId: string, name: string): Promise<IdEntity> {
        const consumer = await this.queryBus.execute<
            FindConsumerByNameOrNullQuery,
            ISelectConsumer | null
        >(new FindConsumerByNameOrNullQuery(name));

        if (!consumer) {
            const createdConsumer = await this.commandBus.execute<
                CreateConsumerCommand,
                ISelectConsumer
            >(
                new CreateConsumerCommand({
                    name,
                    createdAt: getCurrentUTCTimestamp(),
                    updatedAt: getCurrentUTCTimestamp(),
                }),
            );
            await this.commandBus.execute<CreateUserConsumerCommand, ISelectUserConsumer>(
                new CreateUserConsumerCommand({
                    userId,
                    consumerId: createdConsumer.id,
                    createdAt: getCurrentUTCTimestamp(),
                }),
            );
            return IdEntity.create(createdConsumer.id);
        }

        {
            const userConsumer = await this.queryBus.execute<
                FindUserConsumerByRefIdAndTargetIdOrNullQuery,
                ISelectUserConsumer | null
            >(new FindUserConsumerByRefIdAndTargetIdOrNullQuery(userId, consumer.id));

            if (!userConsumer) {
                await this.commandBus.execute<CreateUserConsumerCommand, ISelectUserConsumer>(
                    new CreateUserConsumerCommand({
                        userId,
                        consumerId: consumer.id,
                        createdAt: getCurrentUTCTimestamp(),
                    }),
                );
                return IdEntity.create(consumer.id);
            }

            throw new BadRequestException('You already have the consumer');
        }
    }
}
