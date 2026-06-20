import { NotFoundException } from '@nestjs/common';
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { ProcessFailedInternalServerErrorException } from '@/core/exceptions/processFailedInternalServerError.exception';
import { UserLocationRepository } from '@/modules/location/infrastructure/repositories/userLocation.repository';

import { CreateUserLocationCommand } from './createUserLocation.command';

import type { ISelectUserLocation } from '@/modules/location/infrastructure/schemas/userLocation.schema';

@CommandHandler(CreateUserLocationCommand)
export class CreateUserLocationHandler implements ICommandHandler<CreateUserLocationCommand> {
    constructor(private readonly userLocationRepository: UserLocationRepository) {}

    async execute(command: CreateUserLocationCommand): Promise<ISelectUserLocation> {
        try {
            return await this.userLocationRepository.create(command);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new ProcessFailedInternalServerErrorException();
        }
    }
}
