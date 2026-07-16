import { Injectable } from '@nestjs/common';

import { BillSearchService } from '@/modules/bill/applications/services/search/billSearch.service';
import { ConsumerSearchService } from '@/modules/consumer/applications/services/search/consumerSearch.service';
import { LocationSearchService } from '@/modules/location/applications/services/search/locationSearch.service';
import { ReceiverSearchService } from '@/modules/receiver/applications/services/receiverSearch.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISearchOrchestrator } from '@/modules/search/domain/interface/searchOrchestrator.interface';

@Injectable()
export class SearchOrchestratorService implements IServiceHandler {
    constructor(
        private readonly billSearchService: BillSearchService,
        private readonly consumerSearchService: ConsumerSearchService,
        private readonly locationSearchService: LocationSearchService,
        private readonly receiverSearchService: ReceiverSearchService,
    ) {}

    async execute(userId: string, query: string, size: number): Promise<ISearchOrchestrator> {
        const [billIds, consumerIds, locationIds, receiverIds] = await Promise.all([
            this.billSearchService.search(userId, query, size),
            this.consumerSearchService.search(userId, query, size),
            this.locationSearchService.search(userId, query, size),
            this.receiverSearchService.search(userId, query, size),
        ]);
        return {
            billIds,
            consumerIds,
            locationIds,
            receiverIds,
        };
    }
}
