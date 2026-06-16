import { Module } from '@nestjs/common';

import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateManyBillsConsumersHandler } from '@/modules/consumer/applications/commands/createManyBillsConsumers/createManyBillsConsumers.handler';
import { CreateManyConsumersHandler } from '@/modules/consumer/applications/commands/createManyConsumers/createManyConsumers.handler';
import { CreateManyUsersConsumersHandler } from '@/modules/consumer/applications/commands/createManyUsersConsumers/createManyUsersConsumers.handler';
import { GetManyConsumersByNameHandler } from '@/modules/consumer/applications/queries/getManyConsumersByName/getManyConsumersByName.handler';
import { GetManyUsersConsumersByIdHandler } from '@/modules/consumer/applications/queries/getManyUsersConsumersById/getManyUsersConsumersById.handler';
import { ConsumerService } from '@/modules/consumer/applications/services/consumer.service';
import { CreateManyBillsConsumersService } from '@/modules/consumer/applications/services/createManybillsConsumers.service';
import { UserConsumerService } from '@/modules/consumer/applications/services/userConsumer.service';
import { BillConsumerRepository } from '@/modules/consumer/infrastructure/repositories/billConsumer.repository';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';
import { UserConsumerRepository } from '@/modules/consumer/infrastructure/repositories/userConsumer.repository';

@Module({
    imports: [CqrsModule],
    providers: [
        ConsumerService,
        UserConsumerService,
        CreateManyBillsConsumersService,
        CreateManyUsersConsumersHandler,
        CreateManyConsumersHandler,
        CreateManyBillsConsumersHandler,
        GetManyUsersConsumersByIdHandler,
        GetManyConsumersByNameHandler,
        ConsumerRepository,
        UserConsumerRepository,
        BillConsumerRepository,
    ],
    exports: [ConsumerService, UserConsumerService, CreateManyBillsConsumersService],
})
export class ConsumerModule {}
