import { Injectable } from '@nestjs/common';

import { BillSearchService } from '@/modules/bill/applications/services/search/billSearch.service';
import { ConsumerSearchService } from '@/modules/consumer/applications/services/search/consumerSearch.service';
import { LocationSearchService } from '@/modules/location/applications/services/search/locationSearch.service';
import { ReceiverSearchService } from '@/modules/receiver/applications/services/search/receiverSearch.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { ISearchOrchestrator } from '@/modules/search/domain/interface/searchOrchestrator.interface';

interface IInput {
    userId: string;
    query: string;
    size: number;
}

@Injectable()
export class SearchOrchestratorService implements IService<IInput, ISearchOrchestrator> {
    constructor(
        private readonly billSearchService: BillSearchService,
        private readonly consumerSearchService: ConsumerSearchService,
        private readonly locationSearchService: LocationSearchService,
        private readonly receiverSearchService: ReceiverSearchService,
    ) {}

    async execute(input: IInput): Promise<ISearchOrchestrator> {
        const [billIds, consumerIds, locationIds, receiverIds] = await Promise.all([
            this.billSearchService.search(input.userId, input.query, input.size),
            this.consumerSearchService.search(input.userId, input.query, input.size),
            this.locationSearchService.search(input.userId, input.query, input.size),
            this.receiverSearchService.search(input.userId, input.query, input.size),
        ]);
        return {
            billIds,
            consumerIds,
            locationIds,
            receiverIds,
        };
    }
}
