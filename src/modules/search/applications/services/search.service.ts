import { Injectable } from '@nestjs/common';

import { MAX_LIST_LIMIT } from '@/common/common.constants';

import { SearchAggregateOrchestratorService } from './searchAggregateOrchestrator.service';
import { SearchOrchestratorService } from './searchOrchestrator.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISearch } from '@/modules/search/domain/interface/search.interface';
import type { SearchRequestDto } from '@/modules/search/interfaces/dtos/search.request.dto';

@Injectable()
export class SearchService implements IServiceHandler {
    constructor(
        private readonly searchOrchestratorService: SearchOrchestratorService,
        private readonly searchAggregateOrchestratorService: SearchAggregateOrchestratorService,
    ) {}

    async execute(userId: string, data: SearchRequestDto): Promise<ISearch> {
        const params = this.getParams(data);
        const searchOrchestrators = await this.searchOrchestratorService.execute(
            userId,
            params.q,
            params.limit,
        );
        return this.searchAggregateOrchestratorService.execute(userId, searchOrchestrators);
    }

    private getParams(data: SearchRequestDto): Required<SearchRequestDto> {
        const q = data.q ?? '';
        const limit = data.limit ?? MAX_LIST_LIMIT;

        return { q, limit };
    }
}
