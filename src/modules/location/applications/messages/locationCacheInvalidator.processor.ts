import { Injectable } from '@nestjs/common';

import { QueryCacheInvalidatorService } from '@/core/features/queryCache/queryCacheInvalidator.service';
import { concurrency } from '@/core/utils/concurrency.util';
import { LocationResource } from '@/modules/location/domain/enums/location.enum';

import type { IProcessor } from '@/core/interfaces/processor.interface';

interface IInput {
    userIds: string[];
}

@Injectable()
export class LocationCacheInvalidatorProcessor implements IProcessor<IInput, void> {
    constructor(private readonly queryCacheInvalidatorService: QueryCacheInvalidatorService) {}

    async process(input: IInput): Promise<void> {
        await Promise.all(
            input.userIds.map((userId) =>
                concurrency(() =>
                    this.queryCacheInvalidatorService.invalidateScope(
                        LocationResource.LOCATION,
                        userId,
                    ),
                ),
            ),
        );
    }
}
