import { Injectable } from '@nestjs/common';

import { BillSearchAggregateService } from '@/modules/bill/applications/services/search/billSearchAggregate.service';
import { ConsumerSearchAggregateService } from '@/modules/consumer/applications/services/search/consumerSearchAggregate.service';
import { LocationSearchAggregateService } from '@/modules/location/applications/services/search/locationSearchAggregate.service';
import { ReceiverSearchAggregateService } from '@/modules/receiver/applications/services/search/receiverSearchAggregate.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { ISearch } from '@/modules/search/domain/interface/search.interface';
import type { ISearchOrchestrator } from '@/modules/search/domain/interface/searchOrchestrator.interface';

interface IInput {
    userId: string;
    searchOrchestrators: ISearchOrchestrator;
}

@Injectable()
export class SearchAggregateOrchestratorService implements IService<IInput, ISearch> {
    constructor(
        private readonly billSearchAggregateService: BillSearchAggregateService,
        private readonly consumerSearchAggregateService: ConsumerSearchAggregateService,
        private readonly locationSearchAggregateService: LocationSearchAggregateService,
        private readonly receiverSearchAggregateService: ReceiverSearchAggregateService,
    ) {}

    async execute(input: IInput): Promise<ISearch> {
        const [bills, consumers, locations, receivers] = await Promise.all([
            this.billSearchAggregateService.aggregate(
                input.userId,
                input.searchOrchestrators.billIds,
            ),
            this.consumerSearchAggregateService.aggregate(
                input.userId,
                input.searchOrchestrators.consumerIds,
            ),
            this.locationSearchAggregateService.aggregate(
                input.userId,
                input.searchOrchestrators.locationIds,
            ),
            this.receiverSearchAggregateService.aggregate(
                input.userId,
                input.searchOrchestrators.receiverIds,
            ),
        ]);
        return {
            bills,
            consumers,
            locations,
            receivers,
        };
    }
}
