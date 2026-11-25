import { Injectable } from '@nestjs/common';

import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { BillResource } from '@/modules/bill/domain/enums/bill.enum';

import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

@Injectable()
export class BillElasticsearchIndexerService implements IService<ISelectBill, void> {
    constructor(private readonly elasticsearchService: ElasticSearchService) {}

    async execute(input: ISelectBill): Promise<void> {
        await this.elasticsearchService.bulk({
            operations: [
                {
                    index: {
                        _index: BillResource.BILL,
                        _id: input.id,
                    },
                },
                input,
            ],
        });
    }
}
