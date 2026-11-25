import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ProjectionService } from '@/core/services/projection.service';
import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { CreateConsumerCommand } from '@/modules/consumer/applications/commands/createConsumer/createConsumer.command';
import { ConsumerNameAvailableValidatorService } from '@/modules/consumer/applications/services/validators/consumerNameAvailableValidator.service';
import { ConsumerCacheInvalidatorService } from '@/modules/consumer/infrastructure/cache/consumerCacheInvalidator.service';
import { ConsumerElasticsearchIndexerService } from '@/modules/consumer/infrastructure/elasticsearch/consumerElasticsearchIndexer.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.type';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

interface IInput {
    userId: string;
    name: string;
}

@Injectable()
export class CreateConsumerService implements IService<IInput, IId> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly consumerNameAvailableValidatorService: ConsumerNameAvailableValidatorService,
        private readonly projectionService: ProjectionService,
        private readonly consumerCacheInvalidatorService: ConsumerCacheInvalidatorService,
        private readonly consumerElasticsearchIndexerService: ConsumerElasticsearchIndexerService,
    ) {}

    async execute(input: IInput): Promise<IId> {
        const createdConsumer = await this.create(input);

        await this.projectionService.execute([
            this.consumerCacheInvalidatorService.execute({ userId: input.userId }),
            this.consumerElasticsearchIndexerService.execute(createdConsumer),
        ]);

        return {
            id: createdConsumer.id,
        };
    }

    async create(input: IInput): Promise<ISelectConsumer> {
        await this.consumerNameAvailableValidatorService.validate({
            userId: input.userId,
            name: input.name,
        });

        const creationTime = getCurrentUTCTimestamp();

        return this.commandBus.execute<CreateConsumerCommand, ISelectConsumer>(
            new CreateConsumerCommand({
                name: input.name,
                userId: input.userId,
                createdAt: creationTime,
                updatedAt: creationTime,
            }),
        );
    }
}
