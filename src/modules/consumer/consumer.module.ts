import { Module } from '@nestjs/common';

import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateConsumerHandler } from '@/modules/consumer/applications/commands/createConsumer/createConsumer.handler';
import { GetConsumerByNameOrNullHandler } from '@/modules/consumer/applications/queries/getConsumerByNameOrNull/getConsumerByNameOrNull.handler';
import { ConsumerRepository } from '@/modules/consumer/infrastructure/repositories/consumer.repository';

@Module({
    imports: [CqrsModule],
    providers: [CreateConsumerHandler, GetConsumerByNameOrNullHandler, ConsumerRepository],
})
export class ConsumerModule {}
