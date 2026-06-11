import { Module } from '@nestjs/common';

import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateConsumerHandler } from '@/modules/consumer/applications/commands/createConsumer/createConsumer.handler';
import { GetConsumerByIdOrNullHandler } from '@/modules/consumer/applications/queries/getConsumerByIdOrNull/getConsumerByIdOrNull.handler';
import { GetConsumerByNameOrNullHandler } from '@/modules/consumer/applications/queries/getConsumerByNameOrNull/getConsumerByNameOrNull.handler';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';

@Module({
    imports: [CqrsModule],
    providers: [
        CreateConsumerHandler,
        GetConsumerByIdOrNullHandler,
        GetConsumerByNameOrNullHandler,
        ConsumerRepository,
    ],
})
export class ConsumerModule {}
