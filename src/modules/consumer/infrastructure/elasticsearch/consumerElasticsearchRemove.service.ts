import { Injectable } from '@nestjs/common';

import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { ConsumerResource } from '@/modules/consumer/domain/enums/consumer.enum';

import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@Injectable()
export class ConsumerElasticsearchRemoverService implements IService<ISelectConsumer, void> {
    constructor(private readonly elasticsearchService: ElasticSearchService) {}

    async execute(input: ISelectConsumer): Promise<void> {
        await this.elasticsearchService.bulk({
            operations: [
                {
                    delete: {
                        _index: ConsumerResource.CONSUMER,
                        _id: input.id,
                    },
                },
            ],
        });
    }
}
