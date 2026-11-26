import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ProjectionService } from '@/core/services/projection.service';
import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { UpdateReceiverCommand } from '@/modules/receiver/applications/commands/updateReceiver/updateReceiver.command';
import { ReceiverExistenceValidatorService } from '@/modules/receiver/applications/services/validators/receiverExistenceValidator.service';
import { ReceiverUniqueNameValidatorService } from '@/modules/receiver/applications/services/validators/receiverUniqueNameValidator.service';
import { ReceiverCacheInvalidatorService } from '@/modules/receiver/infrastructure/cache/receiverCacheInvalidator.service';
import { ReceiverElasticsearchIndexerService } from '@/modules/receiver/infrastructure/elasticsearch/receiverElasticsearchIndexer.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.type';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import type { UpdateReceiverRequestDto } from '@/modules/receiver/interfaces/dtos/updateReceiver.request.dto';

interface IInput {
    userId: string;
    body: UpdateReceiverRequestDto;
}

@Injectable()
export class UpdateReceiverService implements IService<IInput, IId> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly receiverExistenceValidatorService: ReceiverExistenceValidatorService,
        private readonly receiverUniqueNameValidatorService: ReceiverUniqueNameValidatorService,
        private readonly receiverCacheInvalidatorService: ReceiverCacheInvalidatorService,
        private readonly receiverElasticsearchIndexerService: ReceiverElasticsearchIndexerService,
        private readonly projectionService: ProjectionService,
    ) {}

    async execute(input: IInput): Promise<IId> {
        const updatedReceiver = await this.update(input);

        await this.projectionService.execute([
            this.receiverCacheInvalidatorService.execute({ userId: input.userId }),
            this.receiverElasticsearchIndexerService.execute(updatedReceiver),
        ]);

        return {
            id: updatedReceiver.id,
        };
    }

    async update(input: IInput): Promise<ISelectReceiver> {
        await Promise.all([
            this.receiverExistenceValidatorService.validate({
                userId: input.userId,
                id: input.body.id,
            }),
            this.receiverUniqueNameValidatorService.validate({
                userId: input.userId,
                excludingId: input.body.id,
                name: input.body.name,
            }),
        ]);

        const creationTime = getCurrentUTCTimestamp();

        return this.commandBus.execute<UpdateReceiverCommand, ISelectReceiver>(
            new UpdateReceiverCommand({
                id: input.body.id,
                name: input.body.name,
                userId: input.userId,
                updatedAt: creationTime,
            }),
        );
    }
}
