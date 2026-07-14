import { Injectable } from '@nestjs/common';

import { BillSearchAggregateService } from '@/modules/bill/applications/services/search/billSearchAggregate.service';
import { ConsumerSearchAggregateService } from '@/modules/consumer/applications/services/consumerSearchAggregate.service';
import { LocationSearchAggregateService } from '@/modules/location/applications/services/locationSearchAggregate.service';
import { ReceiverSearchAggregateService } from '@/modules/receiver/applications/services/receiverSearchAggregate.service';

import type { IServiceHandler } from '@/core/interfaces/serviceHandler.interface';
import type { ISearch } from '@/modules/search/domain/interface/search.interface';
import type { ISearchOrchestrator } from '@/modules/search/domain/interface/searchOrchestrator.interface';

@Injectable()
export class SearchAggregateOrchestratorService implements IServiceHandler {
    constructor(
        private readonly billSearchAggregateService: BillSearchAggregateService,
        private readonly consumerSearchAggregateService: ConsumerSearchAggregateService,
        private readonly locationSearchAggregateService: LocationSearchAggregateService,
        private readonly receiverSearchAggregateService: ReceiverSearchAggregateService,
    ) {}

    async execute(userId: string, searchOrchestrator: ISearchOrchestrator): Promise<ISearch> {
        const [bills, consumers, locations, receivers] = await Promise.all([
            this.billSearchAggregateService.aggregate(userId, searchOrchestrator.billIds),
            this.consumerSearchAggregateService.aggregate(userId, searchOrchestrator.consumerIds),
            this.locationSearchAggregateService.aggregate(userId, searchOrchestrator.locationIds),
            this.receiverSearchAggregateService.aggregate(userId, searchOrchestrator.receiverIds),
        ]);
        return {
            bills,
            consumers,
            locations,
            receivers,
        };
    }
}
