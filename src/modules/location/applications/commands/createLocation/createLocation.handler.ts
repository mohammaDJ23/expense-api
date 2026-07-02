import { NotFoundException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';

import { CreateLocationCommand } from './createLocation.command';

import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@CommandHandler(CreateLocationCommand)
export class CreateLocationHandler implements ICommandHandler<
    CreateLocationCommand,
    ISelectLocation
> {
    constructor(private readonly locationRepository: LocationRepository) {}

    async execute(command: CreateLocationCommand): Promise<ISelectLocation> {
        try {
            return await this.locationRepository.create(command.props);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
