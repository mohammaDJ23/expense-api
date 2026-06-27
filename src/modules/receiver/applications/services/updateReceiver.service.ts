import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { UpdateReceiverCommand } from '@/modules/receiver/applications/commands/updateReceiver/updateReceiver.command';
import { FindReceiverByUserIdAndNameOrNullQuery } from '@/modules/receiver/applications/queries/findReceiverByUserIdAndNameOrNull/findReceiverByUserIdAndNameOrNull.query';
import { IsReceiverExistsByUserIdAndIdQuery } from '@/modules/receiver/applications/queries/isReceiverExistsByUserIdAndId/isReceiverExistsByUserIdAndId.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import type { UpdateReceiverRequestDto } from '@/modules/receiver/interfaces/dtos/updateReceiver.request.dto';

@Injectable()
export class UpdateReceiverService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    async execute(userId: string, data: UpdateReceiverRequestDto): Promise<IdEntity> {
        {
            const [isExists, foundedByName] = await Promise.all([
                this.queryBus.execute<IsReceiverExistsByUserIdAndIdQuery, boolean>(
                    new IsReceiverExistsByUserIdAndIdQuery(userId, data.id),
                ),
                this.queryBus.execute<
                    FindReceiverByUserIdAndNameOrNullQuery,
                    ISelectReceiver | null
                >(new FindReceiverByUserIdAndNameOrNullQuery(userId, data.name)),
            ]);

            if (!isExists) {
                throw new BadRequestException('Could not found the receiver');
            }

            if (foundedByName) {
                throw new BadRequestException('The receiver already exists');
            }
        }

        {
            const updatedReceiver = await this.commandBus.execute<
                UpdateReceiverCommand,
                ISelectReceiver
            >(
                new UpdateReceiverCommand({
                    id: data.id,
                    name: data.name,
                    userId,
                    updatedAt: getCurrentUTCTimestamp(),
                }),
            );
            return IdEntity.create(updatedReceiver.id);
        }
    }
}
