import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateUserReceiverCommand } from '@/modules/receiver/applications/commands/createUserReceiver/createUserReceiver.command';
import { GetUserReceiverByIdOrNullQuery } from '@/modules/receiver/applications/queries/getUserReceiverByIdOrNull/getUserReceiverByIdOrNull.query';

import type { TSelectUserReceiver } from '@/modules/receiver/infrastructure/schemas/userReceiver.schema';

@Injectable()
export class UserReceiverService {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    create(userId: string, receiverId: string): Promise<TSelectUserReceiver> {
        try {
            const createUserReceiverCommand = new CreateUserReceiverCommand({
                userId,
                receiverId,
                createdAt: new Date(),
            });
            return this.commandBus.execute<CreateUserReceiverCommand, TSelectUserReceiver>(
                createUserReceiverCommand,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }

    getByIdOrNull(userId: string, receiverId: string): Promise<TSelectUserReceiver | null> {
        try {
            const getUserReceiverByIdOrNullQuery = new GetUserReceiverByIdOrNullQuery(
                userId,
                receiverId,
            );
            return this.queryBus.execute<
                GetUserReceiverByIdOrNullQuery,
                TSelectUserReceiver | null
            >(getUserReceiverByIdOrNullQuery);
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }

    async createIfNotExists(userId: string, receiverId: string): Promise<void> {
        const userReceiver = await this.getByIdOrNull(userId, receiverId);
        if (!userReceiver) {
            await this.create(userId, receiverId);
        }
    }
}
