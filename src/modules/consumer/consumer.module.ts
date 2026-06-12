import { Module } from '@nestjs/common';

import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateManyConsumersHandler } from '@/modules/consumer/applications/commands/createManyConsumers/createManyConsumers.handler';
import { CreateManyUserConsumerHandler } from '@/modules/consumer/applications/commands/createManyUserConsumer/createManyUserConsumer.handler';
import { GetManyConsumersByNameHandler } from '@/modules/consumer/applications/queries/getManyConsumersByName/getManyConsumersByName.handler';
import { GetManyUserConsumerByIdHandler } from '@/modules/consumer/applications/queries/getManyUserConsumerById/getManyUserConsumerById.handler';
import { ConsumerService } from '@/modules/consumer/applications/services/consumer.service';
import { UserConsumerService } from '@/modules/consumer/applications/services/userConsumer.service';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';
import { UserConsumerRepository } from '@/modules/consumer/infrastructure/repositories/userConsumer.repository';

@Module({
    imports: [CqrsModule],
    providers: [
        ConsumerService,
        UserConsumerService,
        CreateManyUserConsumerHandler,
        CreateManyConsumersHandler,
        GetManyUserConsumerByIdHandler,
        GetManyConsumersByNameHandler,
        ConsumerRepository,
        UserConsumerRepository,
    ],
    exports: [ConsumerService, UserConsumerService],
})
export class ConsumerModule {}
