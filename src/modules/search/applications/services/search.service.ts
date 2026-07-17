import { Injectable } from '@nestjs/common';

import { MAX_LIST_LIMIT } from '@/common/common.constants';

import { SearchAggregateOrchestratorService } from './searchAggregateOrchestrator.service';
import { SearchOrchestratorService } from './searchOrchestrator.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { ISearch } from '@/modules/search/domain/interface/search.interface';
import type { SearchRequestDto } from '@/modules/search/interfaces/dtos/search.request.dto';

interface IInput {
    userId: string;
    query: SearchRequestDto;
}

@Injectable()
export class SearchService implements IService<IInput, ISearch> {
    constructor(
        private readonly searchOrchestratorService: SearchOrchestratorService,
        private readonly searchAggregateOrchestratorService: SearchAggregateOrchestratorService,
    ) {}

    async execute(input: IInput): Promise<ISearch> {
        const query = this.getQuery(input.query);
        const searchOrchestrators = await this.searchOrchestratorService.execute({
            userId: input.userId,
            query: query.q,
            size: query.limit,
        });
        return this.searchAggregateOrchestratorService.execute({
            userId: input.userId,
            searchOrchestrators,
        });
    }

    private getQuery(data: SearchRequestDto): Required<SearchRequestDto> {
        const q = data.q ?? '';
        const limit = data.limit ?? MAX_LIST_LIMIT;

        return { q, limit };
    }
}
