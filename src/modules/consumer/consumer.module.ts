import { Module } from '@nestjs/common';

import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateManyBillsConsumersHandler } from '@/modules/consumer/applications/commands/createManyBillsConsumers/createManyBillsConsumers.handler';
import { CreateManyConsumersHandler } from '@/modules/consumer/applications/commands/createManyConsumers/createManyConsumers.handler';
import { CreateManyUsersConsumersHandler } from '@/modules/consumer/applications/commands/createManyUsersConsumers/createManyUsersConsumers.handler';
import { FindBillConsumerTargetsByRefIdsHandler } from '@/modules/consumer/applications/queries/findBillConsumerTargetsByRefIds/findBillConsumerTargetsByRefIds.handler';
import { FindManyConsumersByNamesHandler } from '@/modules/consumer/applications/queries/findManyConsumersByNames/findManyConsumersByNames.handler';
import { FindManyUsersConsumersByRefIdAndTargetIdsHandler } from '@/modules/consumer/applications/queries/findManyUsersConsumersByRefIdAndTargetIds/findManyUsersConsumersByRefIdAndTargetIds.handler';
import { BillConsumerRepository } from '@/modules/consumer/infrastructure/repositories/billConsumer.repository';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';
import { UserConsumerRepository } from '@/modules/consumer/infrastructure/repositories/userConsumer.repository';

@Module({
    imports: [CqrsModule],
    providers: [
        CreateManyUsersConsumersHandler,
        CreateManyConsumersHandler,
        CreateManyBillsConsumersHandler,
        FindBillConsumerTargetsByRefIdsHandler,
        FindManyUsersConsumersByRefIdAndTargetIdsHandler,
        FindManyConsumersByNamesHandler,
        ConsumerRepository,
        UserConsumerRepository,
        BillConsumerRepository,
    ],
})
export class ConsumerModule {}
