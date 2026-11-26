import { Injectable } from '@nestjs/common';

import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { ReceiverResource } from '@/modules/receiver/domain/enums/receiver.enum';

import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Injectable()
export class ReceiverElasticsearchIndexerService implements IService<ISelectReceiver, void> {
    constructor(private readonly elasticsearchService: ElasticSearchService) {}

    async execute(input: ISelectReceiver): Promise<void> {
        await this.elasticsearchService.bulk({
            operations: [
                {
                    index: {
                        _index: ReceiverResource.RECEIVER,
                        _id: input.id,
                    },
                },
                input,
            ],
        });
    }
}
