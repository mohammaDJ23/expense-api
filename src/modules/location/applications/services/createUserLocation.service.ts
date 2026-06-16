import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';
import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { CreateUserLocationCommand } from '@/modules/location/applications/commands/createUserLocation/createUserLocation.command';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { TSelectUserLocation } from '@/modules/location/infrastructure/schemas/userLocation.schema';

@Injectable()
export class CreateUserLocationService implements IServiceHandler {
    constructor(private readonly commandBus: CommandBus) {}

    async execute(userId: string, locationId: string): Promise<TSelectUserLocation> {
        try {
            const createUserLocationCommand = new CreateUserLocationCommand({
                userId,
                locationId,
                createdAt: getCurrentUTCTimestamp(),
            });
            return await this.commandBus.execute<CreateUserLocationCommand, TSelectUserLocation>(
                createUserLocationCommand,
            );
        } catch {
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
