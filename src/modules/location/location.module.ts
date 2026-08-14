import { Module } from '@nestjs/common';

import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { ElasticsearchModule } from '@/infrastructure/elasticsearch/elasticsearch.module';
import { CreateLocationHandler } from '@/modules/location/applications/commands/createLocation/createLocation.handler';
import { DeleteLocationHandler } from '@/modules/location/applications/commands/deleteLocation/deleteLocation.handler';
import { UpdateLocationHandler } from '@/modules/location/applications/commands/updateLocation/updateLocation.handler';
import { CreatedLocationMessageElasticsearchHandler } from '@/modules/location/applications/messages/createdLocation/createdLocationMessageElasticsearch.handler';
import { DeletedLocationMessageElasticsearchHandler } from '@/modules/location/applications/messages/deletedLocation/deletedLocationMessageElasticsearch.handler';
import { DeletedUserMessageElasticsearchHandler } from '@/modules/location/applications/messages/deletedUser/deletedUserMessageElasticsearch.handler';
import { UpdatedLocationMessageElasticsearchHandler } from '@/modules/location/applications/messages/updatedLocation/updatedLocationMessageElasticsearch.handler';
import { ExistsLocationByUserIdAndExcludingIdAndNameHandler } from '@/modules/location/applications/queries/existsLocationByUserIdAndExcludingIdAndName/existsLocationByUserIdAndExcludingIdAndName.handler';
import { ExistsLocationByUserIdAndIdHandler } from '@/modules/location/applications/queries/existsLocationByUserIdAndId/existsLocationByUserIdAndId.handler';
import { ExistsLocationByUserIdAndNameHandler } from '@/modules/location/applications/queries/existsLocationByUserIdAndName/existsLocationByUserIdAndName.handler';
import { FindLocationByUserIdAndIdOrNullHandler } from '@/modules/location/applications/queries/findLocationByUserIdAndIdOrNull/findLocationByUserIdAndIdOrNull.handler';
import { FindLocationByUserIdAndIdOrThrowHandler } from '@/modules/location/applications/queries/findLocationByUserIdAndIdOrThrow/findLocationByUserIdAndIdOrThrow.handler';
import { FindLocationByUserIdAndNameOrNullHandler } from '@/modules/location/applications/queries/findLocationByUserIdAndNameOrNull/findLocationByUserIdAndNameOrNull.handler';
import { FindLocationListByUserIdHandler } from '@/modules/location/applications/queries/findLocationListByUserId/findLocationListByUserId.handler';
import { FindManyLocationsByUserIdAndIdsHandler } from '@/modules/location/applications/queries/findManyLocationsByUserIdAndIds/findManyLocationsByUserIdAndIds.handler';
import { FindTotalLocationsByUserIdHandler } from '@/modules/location/applications/queries/findTotalLocationsByUserId/findTotalLocationsByUserId.handler';
import { CreateLocationService } from '@/modules/location/applications/services/createLocation.service';
import { DeleteLocationService } from '@/modules/location/applications/services/deleteLocation.service';
import { FindLocationListAndTotalByUserIdService } from '@/modules/location/applications/services/findLocationListAndTotalByUserId.service';
import { FindLocationListByUserIdService } from '@/modules/location/applications/services/findLocationListByUserId.service';
import { LocationService } from '@/modules/location/applications/services/location.service';
import { LocationSearchService } from '@/modules/location/applications/services/search/locationSearch.service';
import { LocationSearchAggregateService } from '@/modules/location/applications/services/search/locationSearchAggregate.service';
import { LocationSearchIndexRegisterService } from '@/modules/location/applications/services/search/locationSearchIndexRegister.service';
import { LocationSearchSyncService } from '@/modules/location/applications/services/search/locationSearchSync.service';
import { UpdateLocationService } from '@/modules/location/applications/services/updateLocation.service';
import { LocationExistenceValidatorService } from '@/modules/location/applications/services/validators/locationExistenceValidator.service';
import { LocationNameAvailableValidatorService } from '@/modules/location/applications/services/validators/locationNameAvailableValidator.service';
import { LocationUniqueNameValidatorService } from '@/modules/location/applications/services/validators/locationUniqueNameValidator.service';
import { LocationElasticsearchIndex } from '@/modules/location/infrastructure/elasticsearch/locationElasticsearch.index';
import { LocationElasticsearchQuery } from '@/modules/location/infrastructure/elasticsearch/locationElasticsearch.query';
import { LocationElasticsearchDeleteQuery } from '@/modules/location/infrastructure/elasticsearch/locationElasticsearchDelete.query';
import { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';
import { LocationController } from '@/modules/location/interfaces/controllers/v1.controller';
import { OutboxModule } from '@/modules/outbox/outbox.module';

@Module({
    imports: [CqrsModule, ElasticsearchModule, OutboxModule],
    controllers: [LocationController],
    providers: [
        LocationService,
        CreateLocationService,
        DeleteLocationService,
        UpdateLocationService,
        CreateLocationHandler,
        UpdateLocationHandler,
        DeleteLocationHandler,
        FindLocationByUserIdAndIdOrNullHandler,
        FindLocationByUserIdAndIdOrThrowHandler,
        FindLocationByUserIdAndNameOrNullHandler,
        FindLocationListAndTotalByUserIdService,
        FindLocationListByUserIdHandler,
        FindManyLocationsByUserIdAndIdsHandler,
        FindTotalLocationsByUserIdHandler,
        FindLocationListByUserIdService,
        ExistsLocationByUserIdAndIdHandler,
        ExistsLocationByUserIdAndExcludingIdAndNameHandler,
        ExistsLocationByUserIdAndNameHandler,
        CreatedLocationMessageElasticsearchHandler,
        UpdatedLocationMessageElasticsearchHandler,
        DeletedLocationMessageElasticsearchHandler,
        DeletedUserMessageElasticsearchHandler,
        CreateLocationHandler,
        LocationRepository,
        LocationElasticsearchIndex,
        LocationElasticsearchQuery,
        LocationElasticsearchDeleteQuery,
        LocationSearchService,
        LocationSearchAggregateService,
        LocationSearchIndexRegisterService,
        LocationExistenceValidatorService,
        LocationUniqueNameValidatorService,
        LocationNameAvailableValidatorService,
        LocationSearchSyncService,
    ],
    exports: [
        LocationSearchService,
        LocationSearchAggregateService,
        LocationExistenceValidatorService,
        LocationSearchSyncService,
    ],
})
export class LocationModule {}
