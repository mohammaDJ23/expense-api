import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@/core/authentication/authentication.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateManyBillsConsumersHandler } from '@/modules/consumer/applications/commands/createManyBillsConsumers/createManyBillsConsumers.handler';
import { CreateManyConsumersHandler } from '@/modules/consumer/applications/commands/createManyConsumers/createManyConsumers.handler';
import { CreateManyUsersConsumersHandler } from '@/modules/consumer/applications/commands/createManyUsersConsumers/createManyUsersConsumers.handler';
import { FindBillConsumerTargetsByRefIdsHandler } from '@/modules/consumer/applications/queries/findBillConsumerTargetsByRefIds/findBillConsumerTargetsByRefIds.handler';
import { FindManyConsumersByNamesHandler } from '@/modules/consumer/applications/queries/findManyConsumersByNames/findManyConsumersByNames.handler';
import { FindManyUsersConsumersByRefIdAndTargetIdsHandler } from '@/modules/consumer/applications/queries/findManyUsersConsumersByRefIdAndTargetIds/findManyUsersConsumersByRefIdAndTargetIds.handler';
import { FindUserConsumerTargetsByRefIdHandler } from '@/modules/consumer/applications/queries/findUserConsumerTargetsByRefId/findUserConsumerTargetsByRefId.handler';
import { UserConsumerService } from '@/modules/consumer/applications/services/userConsumer.service';
import { BillConsumerRepository } from '@/modules/consumer/infrastructure/repositories/billConsumer.repository';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';
import { UserConsumerRepository } from '@/modules/consumer/infrastructure/repositories/userConsumer.repository';
import { ConsumerController } from '@/modules/consumer/interfaces/controllers/v1.controller';

@Module({
    imports: [CqrsModule, AuthenticationModule],
    controllers: [ConsumerController],
    providers: [
        UserConsumerService,
        CreateManyUsersConsumersHandler,
        CreateManyConsumersHandler,
        CreateManyBillsConsumersHandler,
        FindBillConsumerTargetsByRefIdsHandler,
        FindManyUsersConsumersByRefIdAndTargetIdsHandler,
        FindUserConsumerTargetsByRefIdHandler,
        FindManyConsumersByNamesHandler,
        ConsumerRepository,
        UserConsumerRepository,
        BillConsumerRepository,
    ],
})
export class ConsumerModule {}
