import { Injectable } from '@nestjs/common';

import { DEFAULT_CACHE_SCOPE } from '@/core/features/queryCache/queryCache.constants';
import { QueryCacheInvalidatorService } from '@/core/features/queryCache/queryCacheInvalidator.service';
import { UserResource } from '@/modules/user/domain/enums/user.enum';

import type { IService } from '@/core/interfaces/service.interface';

@Injectable()
export class UserCacheInvalidatorService implements IService<void, void> {
    constructor(private readonly queryCacheInvalidatorService: QueryCacheInvalidatorService) {}

    async execute(): Promise<void> {
        await this.queryCacheInvalidatorService.invalidateScope(
            UserResource.USER,
            DEFAULT_CACHE_SCOPE,
        );
    }
}
