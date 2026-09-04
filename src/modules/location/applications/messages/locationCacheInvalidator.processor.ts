import { Injectable } from '@nestjs/common';

import { CacheInvalidatorService } from '@/core/features/cache/cacheInvalidator.service';
import { concurrency } from '@/core/utils/concurrency.util';
import { LocationResource } from '@/modules/location/domain/enums/location.enum';

import type { IProcessor } from '@/core/interfaces/processor.interface';

interface IInput {
    userIds: string[];
}

@Injectable()
export class LocationCacheInvalidatorProcessor implements IProcessor<IInput, void> {
    constructor(private readonly cacheInvalidatorService: CacheInvalidatorService) {}

    async process(input: IInput): Promise<void> {
        await Promise.all(
            input.userIds.map((userId) =>
                concurrency(() =>
                    this.cacheInvalidatorService.invalidateScope(LocationResource.LOCATION, userId),
                ),
            ),
        );
    }
}
