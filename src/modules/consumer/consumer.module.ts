import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CreateManyBillsConsumersHandler } from '@/modules/consumer/applications/commands/createManyBillsConsumers/createManyBillsConsumers.handler';
import { CreateManyConsumersHandler } from '@/modules/consumer/applications/commands/createManyConsumers/createManyConsumers.handler';
import { CreateManyUsersConsumersHandler } from '@/modules/consumer/applications/commands/createManyUsersConsumers/createManyUsersConsumers.handler';
import { GetManyConsumersByNameHandler } from '@/modules/consumer/applications/queries/getManyConsumersByName/getManyConsumersByName.handler';
import { GetManyJoinedBillsConsumersByIdOrThrowHandler } from '@/modules/consumer/applications/queries/getManyJoinedBillsConsumersByIdOrThrow/getManyJoinedBillsConsumersByIdOrThrow.handler';
import { GetManyUsersConsumersByIdHandler } from '@/modules/consumer/applications/queries/getManyUsersConsumersById/getManyUsersConsumersById.handler';
import { CreateManyBillsConsumersService } from '@/modules/consumer/applications/services/createManybillsConsumers.service';
import { CreateManyConsumersService } from '@/modules/consumer/applications/services/createManyConsumers.service';
import { CreateManyUsersConsumersService } from '@/modules/consumer/applications/services/createManyUsersConsumers.service';
import { CreateManyUsersConsumersIfNotExistsService } from '@/modules/consumer/applications/services/createManyUsersConsumersIfNotExists.service';
import { GetManyConsumersByNameService } from '@/modules/consumer/applications/services/getManyConsumersByName.service';
import { GetManyConsumersByNameOrCreateService } from '@/modules/consumer/applications/services/getManyConsumersByNameOrCreate.service';
import { GetManyJoinedBillsConsumersByIdOrThrowService } from '@/modules/consumer/applications/services/getManyJoinedBillsConsumersByIdOrThrow.service';
import { GetManyUsersConsumersByIdService } from '@/modules/consumer/applications/services/getManyUsersConsumersById.service';
import { BillConsumerRepository } from '@/modules/consumer/infrastructure/repositories/billConsumer.repository';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';
import { UserConsumerRepository } from '@/modules/consumer/infrastructure/repositories/userConsumer.repository';

@Module({
    imports: [CqrsModule],
    providers: [
        CreateManyBillsConsumersService,
        CreateManyUsersConsumersHandler,
        CreateManyConsumersHandler,
        CreateManyBillsConsumersHandler,
        CreateManyConsumersService,
        CreateManyUsersConsumersService,
        CreateManyUsersConsumersIfNotExistsService,
        GetManyJoinedBillsConsumersByIdOrThrowService,
        GetManyJoinedBillsConsumersByIdOrThrowHandler,
        GetManyUsersConsumersByIdService,
        GetManyConsumersByNameService,
        GetManyConsumersByNameOrCreateService,
        GetManyUsersConsumersByIdHandler,
        GetManyConsumersByNameHandler,
        ConsumerRepository,
        UserConsumerRepository,
        BillConsumerRepository,
    ],
    exports: [
        CreateManyBillsConsumersService,
        CreateManyUsersConsumersIfNotExistsService,
        GetManyConsumersByNameOrCreateService,
        GetManyJoinedBillsConsumersByIdOrThrowService,
    ],
})
export class ConsumerModule {}
