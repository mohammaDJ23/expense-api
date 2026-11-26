import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ProjectionService } from '@/core/services/projection.service';
import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { CreateLocationCommand } from '@/modules/location/applications/commands/createLocation/createLocation.command';
import { LocationNameAvailableValidatorService } from '@/modules/location/applications/services/validators/locationNameAvailableValidator.service';
import { LocationCacheInvalidatorService } from '@/modules/location/infrastructure/cache/locationCacheInvalidator.service';
import { LocationElasticsearchIndexerService } from '@/modules/location/infrastructure/elasticsearch/locationElasticsearchIndexer.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.type';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

interface IInput {
    userId: string;
    name: string;
}

@Injectable()
export class CreateLocationService implements IService<IInput, IId> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly locationNameAvailableValidatorService: LocationNameAvailableValidatorService,
        private readonly locationCacheInvalidatorService: LocationCacheInvalidatorService,
        private readonly locationElasticsearchIndexerService: LocationElasticsearchIndexerService,
        private readonly projectionService: ProjectionService,
    ) {}

    async execute(input: IInput): Promise<IId> {
        const createdLocation = await this.create(input);

        await this.projectionService.execute([
            this.locationCacheInvalidatorService.execute({ userId: input.userId }),
            this.locationElasticsearchIndexerService.execute(createdLocation),
        ]);

        return {
            id: createdLocation.id,
        };
    }

    async create(input: IInput): Promise<ISelectLocation> {
        await this.locationNameAvailableValidatorService.validate({
            userId: input.userId,
            name: input.name,
        });

        const creationTime = getCurrentUTCTimestamp();

        return this.commandBus.execute<CreateLocationCommand, ISelectLocation>(
            new CreateLocationCommand({
                name: input.name,
                userId: input.userId,
                createdAt: creationTime,
                updatedAt: creationTime,
            }),
        );
    }
}
