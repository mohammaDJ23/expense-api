import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Transactional } from '@nestjs-cls/transactional';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { IdEntity } from '@/core/entities/id.entity';
import { CreateReceiverCommand } from '@/modules/receiver/applications/commands/createReceiver/createReceiver.command';
import { CreateUserReceiverCommand } from '@/modules/receiver/applications/commands/createUserReceiver/createUserReceiver.command';
import { FindReceiverByNameOrNullQuery } from '@/modules/receiver/applications/queries/findReceiverByNameOrNull/findReceiverByNameOrNull.query';
import { FindUserReceiverByRefIdAndTargetIdOrNullQuery } from '@/modules/receiver/applications/queries/findUserReceiverByRefIdAndTargetIdOrNull/findUserReceiverByRefIdAndTargetIdOrNull.query';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import type { ISelectUserReceiver } from '@/modules/receiver/infrastructure/schemas/userReceiver.schema';

@Injectable()
export class CreateReceiverService implements IServiceHandler {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    @Transactional()
    async execute(userId: string, name: string): Promise<IdEntity> {
        const receiver = await this.queryBus.execute<
            FindReceiverByNameOrNullQuery,
            ISelectReceiver | null
        >(new FindReceiverByNameOrNullQuery(name));

        if (!receiver) {
            const createdReceiver = await this.commandBus.execute<
                CreateReceiverCommand,
                ISelectReceiver
            >(
                new CreateReceiverCommand({
                    name,
                    createdAt: getCurrentUTCTimestamp(),
                    updatedAt: getCurrentUTCTimestamp(),
                }),
            );
            await this.commandBus.execute<CreateUserReceiverCommand, ISelectUserReceiver>(
                new CreateUserReceiverCommand({
                    userId,
                    receiverId: createdReceiver.id,
                    createdAt: getCurrentUTCTimestamp(),
                }),
            );
            return IdEntity.create(createdReceiver.id);
        }

        const userReceiver = await this.queryBus.execute<
            FindUserReceiverByRefIdAndTargetIdOrNullQuery,
            ISelectUserReceiver | null
        >(new FindUserReceiverByRefIdAndTargetIdOrNullQuery(userId, receiver.id));

        if (!userReceiver) {
            await this.commandBus.execute<CreateUserReceiverCommand, ISelectUserReceiver>(
                new CreateUserReceiverCommand({
                    userId,
                    receiverId: receiver.id,
                    createdAt: getCurrentUTCTimestamp(),
                }),
            );
            return IdEntity.create(receiver.id);
        }

        throw new BadRequestException('You already have the receiver');
    }
}
