import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs';

import { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';

import { CreateLocationCommand } from './createLocation.command';

import type { TSelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@CommandHandler(CreateLocationCommand)
export class CreateLocationHandler implements ICommandHandler<CreateLocationCommand> {
    constructor(private readonly locationRepository: LocationRepository) {}

    execute(command: CreateLocationCommand): Promise<TSelectLocation> {
        return this.locationRepository.create(command);
    }
}
