import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateLocationCommand } from '@/modules/location/applications/commands/createLocation/createLocation.command';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@Injectable()
export class CreateLocationService implements IServiceHandler {
    constructor(private readonly commandBus: CommandBus) {}

    async execute(name: string): Promise<TSelectLocation> {
        try {
            const createLocationCommand = new CreateLocationCommand({
                name,
                createdAt: getCurrentUTCTimestamp(),
                updatedAt: getCurrentUTCTimestamp(),
            });
            return await this.commandBus.execute<CreateLocationCommand, TSelectLocation>(
                createLocationCommand,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
