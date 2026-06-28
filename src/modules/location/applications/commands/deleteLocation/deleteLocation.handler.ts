import { NotFoundException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';

import { DeleteLocationCommand } from './deleteLocation.command';

import type { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@CommandHandler(DeleteLocationCommand)
export class DeleteLocationHandler implements ICommandHandler<
    DeleteLocationCommand,
    ISelectLocation
> {
    constructor(private readonly locationRepository: LocationRepository) {}

    async execute(command: DeleteLocationCommand): Promise<ISelectLocation> {
        try {
            return await this.locationRepository.deleteByUserIdAndId(
                command.userId,
                command.locationId,
            );
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
