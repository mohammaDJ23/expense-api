import { NotFoundException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { omitUndefined } from '@/core/utils/omitUndefined.util';
import { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';

import { UpdateLocationCommand } from './updateLocation.command';

import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@CommandHandler(UpdateLocationCommand)
export class UpdateLocationHandler implements ICommandHandler<
    UpdateLocationCommand,
    ISelectLocation
> {
    constructor(private readonly locationRepository: LocationRepository) {}

    async execute(command: UpdateLocationCommand): Promise<ISelectLocation> {
        try {
            return await this.locationRepository.update(omitUndefined(command.props));
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
