import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ProjectionService } from '@/core/services/projection.service';
import { DeleteLocationCommand } from '@/modules/location/applications/commands/deleteLocation/deleteLocation.command';
import { LocationExistenceValidatorService } from '@/modules/location/applications/services/validators/locationExistenceValidator.service';
import { LocationCacheInvalidatorService } from '@/modules/location/infrastructure/cache/locationCacheInvalidator.service';
import { LocationElasticsearchRemoverService } from '@/modules/location/infrastructure/elasticsearch/locationElasticsearchRemover.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.type';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

interface IInput {
    userId: string;
    locationId: string;
}

@Injectable()
export class DeleteLocationService implements IService<IInput, IId> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly locationExistenceValidatorService: LocationExistenceValidatorService,
        private readonly locationCacheInvalidatorService: LocationCacheInvalidatorService,
        private readonly locationElasticsearchRemoverService: LocationElasticsearchRemoverService,
        private readonly projectionService: ProjectionService,
    ) {}

    async execute(input: IInput): Promise<IId> {
        const deletedLocation = await this.delete(input);

        await this.projectionService.execute([
            this.locationCacheInvalidatorService.execute({ userId: input.userId }),
            this.locationElasticsearchRemoverService.execute(deletedLocation),
        ]);

        return {
            id: deletedLocation.id,
        };
    }

    async delete(input: IInput): Promise<ISelectLocation> {
        await this.locationExistenceValidatorService.validate({
            userId: input.userId,
            id: input.locationId,
        });

        return this.commandBus.execute<DeleteLocationCommand, ISelectLocation>(
            new DeleteLocationCommand({
                userId: input.userId,
                id: input.locationId,
            }),
        );
    }
}
