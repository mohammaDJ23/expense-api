import { Injectable } from '@nestjs/common';

import { ElasticSearchService } from '@/infrastructure/elasticsearch/elasticsearch.service';
import { LocationResource } from '@/modules/location/domain/enums/location.enum';

import type { IService } from '@/core/interfaces/service.interface';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@Injectable()
export class LocationElasticsearchRemoverService implements IService<ISelectLocation, void> {
    constructor(private readonly elasticsearchService: ElasticSearchService) {}

    async execute(input: ISelectLocation): Promise<void> {
        await this.elasticsearchService.bulk({
            operations: [
                {
                    delete: {
                        _index: LocationResource.LOCATION,
                        _id: input.id,
                    },
                },
            ],
        });
    }
}
