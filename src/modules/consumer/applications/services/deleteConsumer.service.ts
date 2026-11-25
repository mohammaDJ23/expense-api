import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ProjectionService } from '@/core/services/projection.service';
import { DeleteConsumerCommand } from '@/modules/consumer/applications/commands/deleteConsumer/deleteConsumer.command';
import { ConsumerExistenceValidatorService } from '@/modules/consumer/applications/services/validators/consumerExistenceValidator.service';
import { ConsumerCacheInvalidatorService } from '@/modules/consumer/infrastructure/cache/consumerCacheInvalidator.service';
import { ConsumerElasticsearchRemoverService } from '@/modules/consumer/infrastructure/elasticsearch/consumerElasticsearchRemove.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.type';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

interface IInput {
    userId: string;
    consumerId: string;
}

@Injectable()
export class DeleteConsumerService implements IService<IInput, IId> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly consumerExistenceValidatorService: ConsumerExistenceValidatorService,
        private readonly consumerCacheInvalidatorService: ConsumerCacheInvalidatorService,
        private readonly consumerElasticsearchRemoverService: ConsumerElasticsearchRemoverService,
        private readonly projectionService: ProjectionService,
    ) {}

    async execute(input: IInput): Promise<IId> {
        const deletedConsumer = await this.delete(input);

        await this.projectionService.execute([
            this.consumerCacheInvalidatorService.execute({ userId: input.userId }),
            this.consumerElasticsearchRemoverService.execute(deletedConsumer),
        ]);

        return {
            id: deletedConsumer.id,
        };
    }

    async delete(input: IInput): Promise<ISelectConsumer> {
        await this.consumerExistenceValidatorService.validate({
            userId: input.userId,
            id: input.consumerId,
        });

        return this.commandBus.execute<DeleteConsumerCommand, ISelectConsumer>(
            new DeleteConsumerCommand({
                userId: input.userId,
                id: input.consumerId,
            }),
        );
    }
}
