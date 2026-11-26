import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ProjectionService } from '@/core/services/projection.service';
import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { CreateReceiverCommand } from '@/modules/receiver/applications/commands/createReceiver/createReceiver.command';
import { ReceiverNameAvailableValidatorService } from '@/modules/receiver/applications/services/validators/receiverNameAvailableValidator.service';
import { ReceiverCacheInvalidatorService } from '@/modules/receiver/infrastructure/cache/receiverCacheInvalidator.service';
import { ReceiverElasticsearchIndexerService } from '@/modules/receiver/infrastructure/elasticsearch/receiverElasticsearchIndexer.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.type';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

interface IInput {
    userId: string;
    name: string;
}

@Injectable()
export class CreateReceiverService implements IService<IInput, IId> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly receiverNameAvailableValidatorService: ReceiverNameAvailableValidatorService,
        private readonly receiverCacheInvalidatorService: ReceiverCacheInvalidatorService,
        private readonly receiverElasticsearchIndexerService: ReceiverElasticsearchIndexerService,
        private readonly projectionService: ProjectionService,
    ) {}

    async execute(input: IInput): Promise<IId> {
        const createdRecevier = await this.create(input);

        await this.projectionService.execute([
            this.receiverCacheInvalidatorService.execute({ userId: input.userId }),
            this.receiverElasticsearchIndexerService.execute(createdRecevier),
        ]);

        return {
            id: createdRecevier.id,
        };
    }

    async create(input: IInput): Promise<ISelectReceiver> {
        await this.receiverNameAvailableValidatorService.validate({
            userId: input.userId,
            name: input.name,
        });

        const creationTime = getCurrentUTCTimestamp();

        return this.commandBus.execute<CreateReceiverCommand, ISelectReceiver>(
            new CreateReceiverCommand({
                name: input.name,
                userId: input.userId,
                createdAt: creationTime,
                updatedAt: creationTime,
            }),
        );
    }
}
