import { Module } from '@nestjs/common';

import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateManyBillsConsumersHandler } from '@/modules/consumer/applications/commands/createManyBillsConsumers/createManyBillsConsumers.handler';
import { CreateManyConsumersHandler } from '@/modules/consumer/applications/commands/createManyConsumers/createManyConsumers.handler';
import { CreateManyUsersConsumersHandler } from '@/modules/consumer/applications/commands/createManyUsersConsumers/createManyUsersConsumers.handler';
import { GetManyConsumersByNameHandler } from '@/modules/consumer/applications/queries/getManyConsumersByName/getManyConsumersByName.handler';
import { GetManyUsersConsumersByIdHandler } from '@/modules/consumer/applications/queries/getManyUsersConsumersById/getManyUsersConsumersById.handler';
import { CreateManyBillsConsumersService } from '@/modules/consumer/applications/services/createManybillsConsumers.service';
import { CreateManyConsumersService } from '@/modules/consumer/applications/services/createManyConsumers.service';
import { GetManyConsumersByNameService } from '@/modules/consumer/applications/services/getManyConsumersByName.service';
import { GetManyConsumersByNameOrCreateService } from '@/modules/consumer/applications/services/getManyConsumersByNameOrCreate.service';
import { UserConsumerService } from '@/modules/consumer/applications/services/userConsumer.service';
import { BillConsumerRepository } from '@/modules/consumer/infrastructure/repositories/billConsumer.repository';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';
import { UserConsumerRepository } from '@/modules/consumer/infrastructure/repositories/userConsumer.repository';

@Module({
    imports: [CqrsModule],
    providers: [
        UserConsumerService,
        CreateManyBillsConsumersService,
        CreateManyUsersConsumersHandler,
        CreateManyConsumersHandler,
        CreateManyBillsConsumersHandler,
        CreateManyConsumersService,
        GetManyConsumersByNameService,
        GetManyConsumersByNameOrCreateService,
        GetManyUsersConsumersByIdHandler,
        GetManyConsumersByNameHandler,
        ConsumerRepository,
        UserConsumerRepository,
        BillConsumerRepository,
    ],
    exports: [
        UserConsumerService,
        CreateManyBillsConsumersService,
        GetManyConsumersByNameOrCreateService,
    ],
})
export class ConsumerModule {}
