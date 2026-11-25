import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ProjectionService } from '@/core/services/projection.service';
import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { UpdateConsumerCommand } from '@/modules/consumer/applications/commands/updateConsumer/updateConsumer.command';
import { ConsumerExistenceValidatorService } from '@/modules/consumer/applications/services/validators/consumerExistenceValidator.service';
import { ConsumerUniqueNameValidatorService } from '@/modules/consumer/applications/services/validators/consumerUniqueNameValidator.service';
import { ConsumerCacheInvalidatorService } from '@/modules/consumer/infrastructure/cache/consumerCacheInvalidator.service';
import { ConsumerElasticsearchIndexerService } from '@/modules/consumer/infrastructure/elasticsearch/consumerElasticsearchIndexer.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.type';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';
import type { UpdateConsumerRequestDto } from '@/modules/consumer/interfaces/dtos/updateConsumer.request.dto';

interface IInput {
    userId: string;
    body: UpdateConsumerRequestDto;
}

@Injectable()
export class UpdateConsumerService implements IService<IInput, IId> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly consumerExistenceValidatorService: ConsumerExistenceValidatorService,
        private readonly ConsumerUniqueNameValidatorService: ConsumerUniqueNameValidatorService,
        private readonly consumerCacheInvalidatorService: ConsumerCacheInvalidatorService,
        private readonly consumerElasticsearchIndexerService: ConsumerElasticsearchIndexerService,
        private readonly projectionService: ProjectionService,
    ) {}

    async execute(input: IInput): Promise<IId> {
        const updatedConsumer = await this.update(input);

        await this.projectionService.execute([
            this.consumerCacheInvalidatorService.execute({ userId: input.userId }),
            this.consumerElasticsearchIndexerService.execute(updatedConsumer),
        ]);

        return {
            id: updatedConsumer.id,
        };
    }

    async update(input: IInput): Promise<ISelectConsumer> {
        await Promise.all([
            this.consumerExistenceValidatorService.validate({
                userId: input.userId,
                id: input.body.id,
            }),
            this.ConsumerUniqueNameValidatorService.validate({
                userId: input.userId,
                excludingId: input.body.id,
                name: input.body.name,
            }),
        ]);

        const creationTime = getCurrentUTCTimestamp();

        return this.commandBus.execute<UpdateConsumerCommand, ISelectConsumer>(
            new UpdateConsumerCommand({
                id: input.body.id,
                name: input.body.name,
                userId: input.userId,
                updatedAt: creationTime,
            }),
        );
    }
}
