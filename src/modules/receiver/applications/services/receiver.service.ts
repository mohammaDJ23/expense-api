import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateReceiverCommand } from '@/modules/receiver/applications/commands/createReceiver/createReceiver.command';
import { GetReceiverByNameOrNullQuery } from '@/modules/receiver/applications/queries/getReceiverByNameOrNull/getReceiverByNameOrNull.query';

import type { TSelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Injectable()
export class ReceiverService {
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    create(name: string): Promise<TSelectReceiver> {
        try {
            const createReceiverCommand = new CreateReceiverCommand({
                name,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            return this.commandBus.execute<CreateReceiverCommand, TSelectReceiver>(
                createReceiverCommand,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }

    getByNameOrNull(name: string): Promise<TSelectReceiver | null> {
        try {
            const getReceiverByNameOrNullQuery = new GetReceiverByNameOrNullQuery(name);
            return this.queryBus.execute<GetReceiverByNameOrNullQuery, TSelectReceiver | null>(
                getReceiverByNameOrNullQuery,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }

    async getOrCreate(name: string): Promise<TSelectReceiver> {
        const receiver = await this.getByNameOrNull(name);
        if (receiver) {
            return receiver;
        }
        return this.create(name);
    }
}
