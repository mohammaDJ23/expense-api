import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@/core/authentication/authentication.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateConsumerHandler } from '@/modules/consumer/applications/commands/createConsumer/createConsumer.handler';
import { CreateManyBillsConsumersHandler } from '@/modules/consumer/applications/commands/createManyBillsConsumers/createManyBillsConsumers.handler';
import { CreateUserConsumerHandler } from '@/modules/consumer/applications/commands/createUserConsumer/createUserConsumer.handler';
import { DeleteManyBillsConsumersHandler } from '@/modules/consumer/applications/commands/deleteManyBillsConsumers/deleteManyBillsConsumers.handler';
import { FindBillConsumerTargetsByRefIdsHandler } from '@/modules/consumer/applications/queries/findBillConsumerTargetsByRefIds/findBillConsumerTargetsByRefIds.handler';
import { FindConsumerByNameOrNullHandler } from '@/modules/consumer/applications/queries/findConsumerByNameOrNull/findConsumerByNameOrNull.handler';
import { FindManyBillsConsumersByRefIdHandler } from '@/modules/consumer/applications/queries/findManyBillsConsumersByRefId/findManyBillsConsumersByRefId.handler';
import { FindUserConsumerByRefIdAndTargetIdOrNullHandler } from '@/modules/consumer/applications/queries/findUserConsumerByRefIdAndTargetIdOrNull/findUserConsumerByRefIdAndTargetIdOrNull.handler';
import { FindUserConsumerTargetByRefIdAndTargetIdOrThrowHandler } from '@/modules/consumer/applications/queries/findUserConsumerTargetByRefIdAndTargetIdOrThrow/findUserConsumerTargetByRefIdAndTargetIdOrThrow.handler';
import { FindUserConsumerTargetsByRefIdHandler } from '@/modules/consumer/applications/queries/findUserConsumerTargetsByRefId/findUserConsumerTargetsByRefId.handler';
import { IsUserConsumerExistsByRefIdAndTargetIdHandler } from '@/modules/consumer/applications/queries/isUserConsumerExistsByRefIdAndTargetId/isUserConsumerExistsByRefIdAndTargetId.handler';
import { ConsumerService } from '@/modules/consumer/applications/services/consumer.service';
import { CreateConsumerService } from '@/modules/consumer/applications/services/createConsumer.service';
import { UserConsumerService } from '@/modules/consumer/applications/services/userConsumer.service';
import { BillConsumerRepository } from '@/modules/consumer/infrastructure/repositories/billConsumer.repository';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';
import { UserConsumerRepository } from '@/modules/consumer/infrastructure/repositories/userConsumer.repository';
import { ConsumerController } from '@/modules/consumer/interfaces/controllers/v1.controller';

@Module({
    imports: [CqrsModule, AuthenticationModule],
    controllers: [ConsumerController],
    providers: [
        ConsumerService,
        CreateConsumerService,
        UserConsumerService,
        CreateUserConsumerHandler,
        DeleteManyBillsConsumersHandler,
        CreateConsumerHandler,
        CreateManyBillsConsumersHandler,
        FindBillConsumerTargetsByRefIdsHandler,
        FindUserConsumerByRefIdAndTargetIdOrNullHandler,
        FindUserConsumerTargetByRefIdAndTargetIdOrThrowHandler,
        IsUserConsumerExistsByRefIdAndTargetIdHandler,
        FindManyBillsConsumersByRefIdHandler,
        FindUserConsumerTargetsByRefIdHandler,
        FindConsumerByNameOrNullHandler,
        ConsumerRepository,
        UserConsumerRepository,
        BillConsumerRepository,
    ],
})
export class ConsumerModule {}
