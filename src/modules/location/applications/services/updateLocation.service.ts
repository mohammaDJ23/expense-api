import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { ProjectionService } from '@/core/services/projection.service';
import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { UpdateLocationCommand } from '@/modules/location/applications/commands/updateLocation/updateLocation.command';
import { LocationExistenceValidatorService } from '@/modules/location/applications/services/validators/locationExistenceValidator.service';
import { LocationUniqueNameValidatorService } from '@/modules/location/applications/services/validators/locationUniqueNameValidator.service';
import { LocationCacheInvalidatorService } from '@/modules/location/infrastructure/cache/locationCacheInvalidator.service';
import { LocationElasticsearchIndexerService } from '@/modules/location/infrastructure/elasticsearch/locationElasticsearchIndexer.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { IId } from '@/core/types/id.type';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';
import type { UpdateLocationRequestDto } from '@/modules/location/interfaces/dtos/updateLocation.request.dto';

interface IInput {
    userId: string;
    body: UpdateLocationRequestDto;
}

@Injectable()
export class UpdateLocationService implements IService<IInput, IId> {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly locationExistenceValidatorService: LocationExistenceValidatorService,
        private readonly locationUniqueNameValidatorService: LocationUniqueNameValidatorService,
        private readonly locationCacheInvalidatorService: LocationCacheInvalidatorService,
        private readonly locationElasticsearchIndexerService: LocationElasticsearchIndexerService,
        private readonly projectionService: ProjectionService,
    ) {}

    async execute(input: IInput): Promise<IId> {
        const updatedLocation = await this.update(input);

        await this.projectionService.execute([
            this.locationCacheInvalidatorService.execute({ userId: input.userId }),
            this.locationElasticsearchIndexerService.execute(updatedLocation),
        ]);

        return {
            id: updatedLocation.id,
        };
    }

    async update(input: IInput): Promise<ISelectLocation> {
        await Promise.all([
            this.locationExistenceValidatorService.validate({
                userId: input.userId,
                id: input.body.id,
            }),
            this.locationUniqueNameValidatorService.validate({
                userId: input.userId,
                excludingId: input.body.id,
                name: input.body.name,
            }),
        ]);

        const creationTime = getCurrentUTCTimestamp();

        return this.commandBus.execute<UpdateLocationCommand, ISelectLocation>(
            new UpdateLocationCommand({
                id: input.body.id,
                name: input.body.name,
                userId: input.userId,
                updatedAt: creationTime,
            }),
        );
    }
}
