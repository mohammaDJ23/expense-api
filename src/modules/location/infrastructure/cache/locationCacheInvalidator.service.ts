import { Injectable } from '@nestjs/common';

import { QueryCacheInvalidatorService } from '@/core/features/queryCache/queryCacheInvalidator.service';
import { LocationResource } from '@/modules/location/domain/enums/location.enum';

import type { IService } from '@/core/interfaces/service.interface';

interface IInput {
    userId: string;
}

@Injectable()
export class LocationCacheInvalidatorService implements IService<IInput, void> {
    constructor(private readonly queryCacheInvalidatorService: QueryCacheInvalidatorService) {}

    async execute(input: IInput): Promise<void> {
        await this.queryCacheInvalidatorService.invalidateScope(
            LocationResource.LOCATION,
            input.userId,
        );
    }
}
