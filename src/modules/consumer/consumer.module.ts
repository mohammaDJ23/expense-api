import { Module } from '@nestjs/common';

import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateConsumerHandler } from '@/modules/consumer/applications/commands/createConsumer/createConsumer.handler';
import { CreateManyConsumersHandler } from '@/modules/consumer/applications/commands/createManyConsumers/createManyConsumers.handler';
import { CreateUserConsumerHandler } from '@/modules/consumer/applications/commands/createUserConsumer/createUserConsumer.handler';
import { GetConsumerByNameOrNullHandler } from '@/modules/consumer/applications/queries/getConsumerByNameOrNull/getConsumerByNameOrNull.handler';
import { GetManyConsumersByNameHandler } from '@/modules/consumer/applications/queries/getManyConsumersByName/getManyConsumersByName.handler';
import { GetUserConsumerByIdOrNullHandler } from '@/modules/consumer/applications/queries/getUserConsumerByIdOrNull/getUserConsumerByIdOrNull.handler';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';
import { UserConsumerRepository } from '@/modules/consumer/infrastructure/repositories/userConsumer.repository';

@Module({
    imports: [CqrsModule],
    providers: [
        CreateConsumerHandler,
        CreateUserConsumerHandler,
        CreateManyConsumersHandler,
        GetConsumerByNameOrNullHandler,
        GetUserConsumerByIdOrNullHandler,
        GetManyConsumersByNameHandler,
        ConsumerRepository,
        UserConsumerRepository,
    ],
})
export class ConsumerModule {}
