import { Injectable } from '@nestjs/common';

import { SearchQueryService } from './searchQuery.service';
import { SearchSyncService } from './searchSync.service';

import type { ISearch } from '@/modules/search/domain/types/search.type';
import type { SearchRequestDto } from '@/modules/search/interfaces/dtos/search.request.dto';

@Injectable()
export class SearchService {
    constructor(
        private readonly searchQueryService: SearchQueryService,
        private readonly searchSyncService: SearchSyncService,
    ) {}

    searchQuery(userId: string, query: SearchRequestDto): Promise<ISearch> {
        return this.searchQueryService.execute({ userId, query });
    }

    searchSync(userId: string): Promise<boolean> {
        return this.searchSyncService.execute({ userId });
    }
}
