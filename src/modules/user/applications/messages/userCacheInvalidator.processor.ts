import { Injectable } from '@nestjs/common';

import { DEFAULT_CACHE_SCOPE } from '@/core/features/queryCache/queryCache.constants';
import { QueryCacheInvalidatorService } from '@/core/features/queryCache/queryCacheInvalidator.service';
import { concurrency } from '@/core/utils/concurrency.util';
import { UserResource } from '@/modules/user/domain/enums/user.enum';

import type { IProcessor } from '@/core/interfaces/processor.interface';

interface IInput {
    userIds: string[];
}

@Injectable()
export class UserCacheInvalidatorProcessor implements IProcessor<IInput, void> {
    constructor(private readonly queryCacheInvalidatorService: QueryCacheInvalidatorService) {}

    async process(input: IInput): Promise<void> {
        await Promise.all(
            input.userIds.map(() =>
                concurrency(() =>
                    this.queryCacheInvalidatorService.invalidateScope(
                        UserResource.USER,
                        DEFAULT_CACHE_SCOPE,
                    ),
                ),
            ),
        );
    }
}
