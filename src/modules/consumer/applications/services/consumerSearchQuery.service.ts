import { Injectable } from '@nestjs/common';

import { ConsumerSearchService } from '@/modules/consumer/applications/services/search/consumerSearch.service';
import { ConsumerSearchAggregateService } from '@/modules/consumer/applications/services/search/consumerSearchAggregate.service';

import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

interface IInput {
    userId: string;
    limit: number;
    q: string;
}

@Injectable()
export class ConsumerSearchQueryService implements IService<IInput, ISelectConsumer[]> {
    constructor(
        private readonly consumerSearchService: ConsumerSearchService,
        private readonly consumerSearchAggregateService: ConsumerSearchAggregateService,
    ) {}

    async execute(input: IInput): Promise<ISelectConsumer[]> {
        const consumerIds = await this.consumerSearchService.search(
            input.userId,
            input.q,
            input.limit,
        );

        return this.consumerSearchAggregateService.aggregate(input.userId, consumerIds);
    }
}
