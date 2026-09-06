import { Injectable } from '@nestjs/common';

import { ReceiverSearchService } from '@/modules/receiver/applications/services/search/receiverSearch.service';
import { ReceiverSearchAggregateService } from '@/modules/receiver/applications/services/search/receiverSearchAggregate.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

interface IInput {
    userId: string;
    limit: number;
    q: string;
}

@Injectable()
export class ReceiverSearchQueryService implements IService<IInput, ISelectReceiver[]> {
    constructor(
        private readonly receiverSearchService: ReceiverSearchService,
        private readonly receiverSearchAggregateService: ReceiverSearchAggregateService,
    ) {}

    async execute(input: IInput): Promise<ISelectReceiver[]> {
        const receiverIds = await this.receiverSearchService.search(
            input.userId,
            input.q,
            input.limit,
        );

        return this.receiverSearchAggregateService.aggregate(input.userId, receiverIds);
    }
}
