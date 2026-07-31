import { Injectable } from '@nestjs/common';

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
        const searchOrchestrators = await this.searchOrchestratorService.execute({
            userId: input.userId,
            query: input.query.q,
            size: input.query.limit,
        });
        return this.searchAggregateOrchestratorService.execute({
            userId: input.userId,
            searchOrchestrators,
        });
    }
}
