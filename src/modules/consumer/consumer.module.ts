import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@/core/authentication/authentication.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { ElasticsearchModule } from '@/infrastructure/elasticsearch/elasticsearch.module';
import { CreateConsumerHandler } from '@/modules/consumer/applications/commands/createConsumer/createConsumer.handler';
import { CreateManyBillsConsumersHandler } from '@/modules/consumer/applications/commands/createManyBillsConsumers/createManyBillsConsumers.handler';
import { DeleteConsumerHandler } from '@/modules/consumer/applications/commands/deleteConsumer/deleteConsumer.handler';
import { DeleteManyBillsConsumersHandler } from '@/modules/consumer/applications/commands/deleteManyBillsConsumers/deleteManyBillsConsumers.handler';
import { UpdateConsumerHandler } from '@/modules/consumer/applications/commands/updateConsumer/updateConsumer.handler';
import { CreateConsumerMessageHandler } from '@/modules/consumer/applications/messages/createConsumer/createConsumerMessage.handler';
import { CreateConsumerMessageElasticsearchProcessor } from '@/modules/consumer/applications/messages/createConsumer/createConsumerMessageElasticsearch.processor';
import { DeleteConsumerMessageHandler } from '@/modules/consumer/applications/messages/deleteConsumer/deleteConsumerMessage.handler';
import { DeleteConsumerMessageElasticsearchProcessor } from '@/modules/consumer/applications/messages/deleteConsumer/deleteConsumerMessageElasticsearch.processor';
import { UpdateConsumerMessageHandler } from '@/modules/consumer/applications/messages/updateConsumer/updateConsumerMessage.handler';
import { UpdateConsumerMessageElasticsearchProcessor } from '@/modules/consumer/applications/messages/updateConsumer/updateConsumerMessageElasticsearch.processor';
import { ExistsConsumerByUserIdAndExcludingIdAndNameHandler } from '@/modules/consumer/applications/queries/existsConsumerByUserIdAndExcludingIdAndName/existsConsumerByUserIdAndExcludingIdAndName.handler';
import { ExistsConsumerByUserIdAndIdHandler } from '@/modules/consumer/applications/queries/existsConsumerByUserIdAndId/existsConsumerByUserIdAndId.handler';
import { ExistsConsumerByUserIdAndIdsHandler } from '@/modules/consumer/applications/queries/existsConsumerByUserIdAndIds/existsConsumerByUserIdAndIds.handler';
import { FindConsumerByUserIdAndIdOrNullHandler } from '@/modules/consumer/applications/queries/findConsumerByUserIdAndIdOrNull/findConsumerByUserIdAndIdOrNull.handler';
import { FindConsumerByUserIdAndIdOrThrowHandler } from '@/modules/consumer/applications/queries/findConsumerByUserIdAndIdOrThrow/findConsumerByUserIdAndIdOrThrow.handler';
import { FindConsumerByUserIdAndNameOrNullHandler } from '@/modules/consumer/applications/queries/findConsumerByUserIdAndNameOrNull/findConsumerByUserIdAndNameOrNull.handler';
import { FindConsumerListByUserIdHandler } from '@/modules/consumer/applications/queries/findConsumerListByUserId/findConsumerListByUserId.handler';
import { FindManyBillConsumerTargetsByRefIdsHandler } from '@/modules/consumer/applications/queries/findManyBillConsumerTargetsByRefIds/findManyBillConsumerTargetsByRefIds.handler';
import { FindManyBillsConsumersByRefIdHandler } from '@/modules/consumer/applications/queries/findManyBillsConsumersByRefId/findManyBillsConsumersByRefId.handler';
import { FindManyConsumersByUserIdAndIdsHandler } from '@/modules/consumer/applications/queries/findManyConsumersByUserIdAndIds/findManyConsumersByUserIdAndIds.handler';
import { ConsumerService } from '@/modules/consumer/applications/services/consumer.service';
import { ConsumerSearchService } from '@/modules/consumer/applications/services/consumerSearch.service';
import { ConsumerSearchAggregateService } from '@/modules/consumer/applications/services/consumerSearchAggregate.service';
import { CreateConsumerService } from '@/modules/consumer/applications/services/createConsumer.service';
import { DeleteConsumerService } from '@/modules/consumer/applications/services/deleteConsumer.service';
import { UpdateConsumerService } from '@/modules/consumer/applications/services/updateConsumer.service';
import { ConsumerElasticsearchIndex } from '@/modules/consumer/infrastructure/elasticsearch/consumerElasticsearch.index';
import { ConsumerElasticsearchQuery } from '@/modules/consumer/infrastructure/elasticsearch/consumerElasticsearch.query';
import { BillConsumerRepository } from '@/modules/consumer/infrastructure/repositories/billConsumer.repository';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';
import { ConsumerController } from '@/modules/consumer/interfaces/controllers/v1.controller';

@Module({
    imports: [CqrsModule, AuthenticationModule, ElasticsearchModule],
    controllers: [ConsumerController],
    providers: [
        CreateConsumerService,
        DeleteConsumerService,
        UpdateConsumerService,
        FindConsumerByUserIdAndIdOrNullHandler,
        FindConsumerByUserIdAndIdOrThrowHandler,
        FindConsumerListByUserIdHandler,
        FindManyConsumersByUserIdAndIdsHandler,
        ExistsConsumerByUserIdAndIdsHandler,
        ExistsConsumerByUserIdAndIdHandler,
        DeleteConsumerHandler,
        UpdateConsumerHandler,
        FindConsumerByUserIdAndNameOrNullHandler,
        ConsumerService,
        DeleteManyBillsConsumersHandler,
        CreateConsumerHandler,
        CreateManyBillsConsumersHandler,
        FindManyBillConsumerTargetsByRefIdsHandler,
        ExistsConsumerByUserIdAndExcludingIdAndNameHandler,
        FindManyBillsConsumersByRefIdHandler,
        CreateConsumerMessageHandler,
        CreateConsumerMessageElasticsearchProcessor,
        UpdateConsumerMessageHandler,
        UpdateConsumerMessageElasticsearchProcessor,
        DeleteConsumerMessageHandler,
        DeleteConsumerMessageElasticsearchProcessor,
        ConsumerRepository,
        BillConsumerRepository,
        ConsumerElasticsearchIndex,
        ConsumerElasticsearchQuery,
        ConsumerSearchService,
        ConsumerSearchAggregateService,
    ],
    exports: [ConsumerSearchService, ConsumerSearchAggregateService],
})
export class ConsumerModule {}
