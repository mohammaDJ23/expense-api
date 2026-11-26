import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ProjectionService } from '@/core/services/projection.service';
import { DeleteReceiverCommand } from '@/modules/receiver/applications/commands/deleteReceiver/deleteReceiver.command';
import { ReceiverExistenceValidatorService } from '@/modules/receiver/applications/services/validators/receiverExistenceValidator.service';
import { ReceiverCacheInvalidatorService } from '@/modules/receiver/infrastructure/cache/receiverCacheInvalidator.service';
import { ReceiverElasticsearchRemoverService } from '@/modules/receiver/infrastructure/elasticsearch/receiverElasticsearchRemover.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.type';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

interface IInput {
    userId: string;
    receiverId: string;
}

@Injectable()
export class DeleteReceiverService implements IService<IInput, IId> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly receiverExistenceValidatorService: ReceiverExistenceValidatorService,
        private readonly receiverCacheInvalidatorService: ReceiverCacheInvalidatorService,
        private readonly receiverElasticsearchRemoverService: ReceiverElasticsearchRemoverService,
        private readonly projectionService: ProjectionService,
    ) {}

    async execute(input: IInput): Promise<IId> {
        const deletedReceiver = await this.delete(input);

        await this.projectionService.execute([
            this.receiverCacheInvalidatorService.execute({ userId: input.userId }),
            this.receiverElasticsearchRemoverService.execute(deletedReceiver),
        ]);

        return {
            id: deletedReceiver.id,
        };
    }

    async delete(input: IInput): Promise<ISelectReceiver> {
        await this.receiverExistenceValidatorService.validate({
            userId: input.userId,
            id: input.receiverId,
        });

        return this.commandBus.execute<DeleteReceiverCommand, ISelectReceiver>(
            new DeleteReceiverCommand({
                userId: input.userId,
                id: input.receiverId,
            }),
        );
    }
}
