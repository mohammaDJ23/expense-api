import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
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

    async create(name: string): Promise<TSelectReceiver> {
        try {
            const createReceiverCommand = new CreateReceiverCommand({
                name,
                createdAt: getCurrentUTCTimestamp(),
                updatedAt: getCurrentUTCTimestamp(),
            });
            return await this.commandBus.execute<CreateReceiverCommand, TSelectReceiver>(
                createReceiverCommand,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }

    async getByNameOrNull(name: string): Promise<TSelectReceiver | null> {
        try {
            const getReceiverByNameOrNullQuery = new GetReceiverByNameOrNullQuery(name);
            return await this.queryBus.execute<
                GetReceiverByNameOrNullQuery,
                TSelectReceiver | null
            >(getReceiverByNameOrNullQuery);
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
