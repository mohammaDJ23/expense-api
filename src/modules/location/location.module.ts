import { Module } from '@nestjs/common';

import { CacheModule } from '@/core/features/cache/cache.module';
import { JWTModule } from '@/core/features/jwt/jwt.module';
import { CursorPaginationModule } from '@/core/features/pagination/cursor/cursorPagination.module';
import { QueryDispatcherModule } from '@/core/features/queryDispatcher/queryDispatcher.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { ElasticsearchModule } from '@/infrastructure/elasticsearch/elasticsearch.module';
import { CreateLocationHandler } from '@/modules/location/applications/commands/createLocation/createLocation.handler';
import { DeleteLocationHandler } from '@/modules/location/applications/commands/deleteLocation/deleteLocation.handler';
import { UpdateLocationHandler } from '@/modules/location/applications/commands/updateLocation/updateLocation.handler';
import { CreatedLocationCacheInvalidatorHandler } from '@/modules/location/applications/messages/createdLocation/createdLocationCacheInvalidator.handler';
import { CreatedLocationElasticsearchIndexerHandler } from '@/modules/location/applications/messages/createdLocation/createdLocationElasticsearchIndexer.handler';
import { DeletedLocationCacheInvalidatorHandler } from '@/modules/location/applications/messages/deletedLocation/deletedLocationCacheInvalidator.handler';
import { DeletedLocationElasticsearchRemoverHandler } from '@/modules/location/applications/messages/deletedLocation/deletedLocationElasticsearchRemover.handler';
import { DeletedUserLocationCacheInvalidatorHandler } from '@/modules/location/applications/messages/deletedUser/deletedUserLocationCacheInvalidator.handler';
import { DeletedUserLocationElasticsearchRemoverHandler } from '@/modules/location/applications/messages/deletedUser/deletedUserLocationElasticsearchRemover.handler';
import { LocationCacheInvalidatorProcessor } from '@/modules/location/applications/messages/locationCacheInvalidator.processor';
import { LocationElasticsearchIndexerProcessor } from '@/modules/location/applications/messages/locationElasticsearchIndexer.processor';
import { UpdatedLocationCacheInvalidatorHandler } from '@/modules/location/applications/messages/updatedLocation/updatedLocationCacheInvalidator.handler';
import { UpdatedLocationElasticsearchIndexerHandler } from '@/modules/location/applications/messages/updatedLocation/updatedLocationElasticsearchIndexer.handler';
import { LocationListCursorPaginationDefinition } from '@/modules/location/applications/pagination/cursor/locationListCursorPagination.definition';
import { ExistsLocationByUserIdAndExcludingIdAndNameHandler } from '@/modules/location/applications/queries/existsLocationByUserIdAndExcludingIdAndName/existsLocationByUserIdAndExcludingIdAndName.handler';
import { ExistsLocationByUserIdAndIdHandler } from '@/modules/location/applications/queries/existsLocationByUserIdAndId/existsLocationByUserIdAndId.handler';
import { ExistsLocationByUserIdAndNameHandler } from '@/modules/location/applications/queries/existsLocationByUserIdAndName/existsLocationByUserIdAndName.handler';
import { FindLocationByUserIdAndIdOrThrowHandler } from '@/modules/location/applications/queries/findLocationByUserIdAndIdOrThrow/findLocationByUserIdAndIdOrThrow.handler';
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
import { DeleteLocationsElasticsearchQuery } from '@/modules/location/infrastructure/elasticsearch/deleteLocationsElasticsearch.query';
import { FindLocationListElasticsearchQuery } from '@/modules/location/infrastructure/elasticsearch/findLocationListElasticsearch.query';
import { LocationElasticsearchIndex } from '@/modules/location/infrastructure/elasticsearch/locationElasticsearch.index';
import { LocationRepository } from '@/modules/location/infrastructure/repositories/location.repository';
import { LocationController } from '@/modules/location/interfaces/controllers/v1.controller';
import { OutboxModule } from '@/modules/outbox/outbox.module';

@Module({
    imports: [
        CqrsModule,
        ElasticsearchModule,
        OutboxModule,
        QueryDispatcherModule,
        CacheModule,
        CursorPaginationModule,
        JWTModule,
    ],
    controllers: [LocationController],
    providers: [
        LocationService,
        CreateLocationService,
        DeleteLocationService,
        UpdateLocationService,
        CreateLocationHandler,
        UpdateLocationHandler,
        DeleteLocationHandler,
        FindLocationByUserIdAndIdOrThrowHandler,
        FindLocationListAndTotalByUserIdService,
        FindLocationListByUserIdHandler,
        FindManyLocationsByUserIdAndIdsHandler,
        FindTotalLocationsByUserIdHandler,
        FindLocationListByUserIdService,
        ExistsLocationByUserIdAndIdHandler,
        ExistsLocationByUserIdAndExcludingIdAndNameHandler,
        ExistsLocationByUserIdAndNameHandler,
        CreatedLocationElasticsearchIndexerHandler,
        UpdatedLocationElasticsearchIndexerHandler,
        DeletedLocationElasticsearchRemoverHandler,
        DeletedUserLocationElasticsearchRemoverHandler,
        CreateLocationHandler,
        LocationRepository,
        LocationElasticsearchIndex,
        FindLocationListElasticsearchQuery,
        DeleteLocationsElasticsearchQuery,
        LocationSearchService,
        LocationSearchAggregateService,
        LocationSearchIndexRegisterService,
        LocationExistenceValidatorService,
        LocationUniqueNameValidatorService,
        LocationNameAvailableValidatorService,
        LocationSearchSyncService,
        LocationElasticsearchIndexerProcessor,
        CreatedLocationCacheInvalidatorHandler,
        DeletedLocationCacheInvalidatorHandler,
        DeletedUserLocationCacheInvalidatorHandler,
        UpdatedLocationCacheInvalidatorHandler,
        LocationCacheInvalidatorProcessor,
        LocationListCursorPaginationDefinition,
    ],
    exports: [
        LocationSearchService,
        LocationSearchAggregateService,
        LocationExistenceValidatorService,
        LocationSearchSyncService,
    ],
})
export class LocationModule {}
