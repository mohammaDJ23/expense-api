import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { UserLocationRepository } from '@/modules/location/infrastructure/repositories/userLocation.repository';

import { CreateUserLocationCommand } from './createUserLocation.command';

import type { TSelectUserLocation } from '@/modules/location/infrastructure/schemas/userLocation.schema';

@CommandHandler(CreateUserLocationCommand)
export class CreateUserLocationHandler implements ICommandHandler<CreateUserLocationCommand> {
    constructor(private readonly userLocationRepository: UserLocationRepository) {}

    execute(command: CreateUserLocationCommand): Promise<TSelectUserLocation> {
        return this.userLocationRepository.create(command);
    }
}
