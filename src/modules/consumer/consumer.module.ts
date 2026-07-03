import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@/core/authentication/authentication.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateConsumerHandler } from '@/modules/consumer/applications/commands/createConsumer/createConsumer.handler';
import { CreateManyBillsConsumersHandler } from '@/modules/consumer/applications/commands/createManyBillsConsumers/createManyBillsConsumers.handler';
import { DeleteConsumerHandler } from '@/modules/consumer/applications/commands/deleteConsumer/deleteConsumer.handler';
import { DeleteManyBillsConsumersHandler } from '@/modules/consumer/applications/commands/deleteManyBillsConsumers/deleteManyBillsConsumers.handler';
import { UpdateConsumerHandler } from '@/modules/consumer/applications/commands/updateConsumer/updateConsumer.handler';
import { ExistsConsumerByUserIdAndExcludingIdAndNameHandler } from '@/modules/consumer/applications/queries/existsConsumerByUserIdAndExcludingIdAndName/existsConsumerByUserIdAndExcludingIdAndName.handler';
import { FindConsumerByUserIdAndIdOrNullHandler } from '@/modules/consumer/applications/queries/findConsumerByUserIdAndIdOrNull/findConsumerByUserIdAndIdOrNull.handler';
import { FindConsumerByUserIdAndIdOrThrowHandler } from '@/modules/consumer/applications/queries/findConsumerByUserIdAndIdOrThrow/findConsumerByUserIdAndIdOrThrow.handler';
import { FindConsumerByUserIdAndNameOrNullHandler } from '@/modules/consumer/applications/queries/findConsumerByUserIdAndNameOrNull/findConsumerByUserIdAndNameOrNull.handler';
import { FindConsumerListByUserIdHandler } from '@/modules/consumer/applications/queries/findConsumerListByUserId/findConsumerListByUserId.handler';
import { FindManyBillConsumerTargetsByRefIdsHandler } from '@/modules/consumer/applications/queries/findManyBillConsumerTargetsByRefIds/findManyBillConsumerTargetsByRefIds.handler';
import { FindManyBillsConsumersByRefIdHandler } from '@/modules/consumer/applications/queries/findManyBillsConsumersByRefId/findManyBillsConsumersByRefId.handler';
import { FindManyConsumersByUserIdAndIdsHandler } from '@/modules/consumer/applications/queries/findManyConsumersByUserIdAndIds/findManyConsumersByUserIdAndIds.handler';
import { IsConsumerExistsByUserIdAndIdHandler } from '@/modules/consumer/applications/queries/isConsumerExistsByUserIdAndId/isConsumerExistsByUserIdAndId.handler';
import { IsConsumerExistsByUserIdAndIdsHandler } from '@/modules/consumer/applications/queries/isConsumerExistsByUserIdAndIds/isConsumerExistsByUserIdAndIds.handler';
import { ConsumerService } from '@/modules/consumer/applications/services/consumer.service';
import { CreateConsumerService } from '@/modules/consumer/applications/services/createConsumer.service';
import { DeleteConsumerService } from '@/modules/consumer/applications/services/deleteConsumer.service';
import { UpdateConsumerService } from '@/modules/consumer/applications/services/updateConsumer.service';
import { BillConsumerRepository } from '@/modules/consumer/infrastructure/repositories/billConsumer.repository';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';
import { ConsumerController } from '@/modules/consumer/interfaces/controllers/v1.controller';

@Module({
    imports: [CqrsModule, AuthenticationModule],
    controllers: [ConsumerController],
    providers: [
        CreateConsumerService,
        DeleteConsumerService,
        UpdateConsumerService,
        FindConsumerByUserIdAndIdOrNullHandler,
        FindConsumerByUserIdAndIdOrThrowHandler,
        FindConsumerListByUserIdHandler,
        FindManyConsumersByUserIdAndIdsHandler,
        IsConsumerExistsByUserIdAndIdsHandler,
        IsConsumerExistsByUserIdAndIdHandler,
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
        ConsumerRepository,
        BillConsumerRepository,
    ],
})
export class ConsumerModule {}
