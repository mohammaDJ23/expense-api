import { Module } from '@nestjs/common';

import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateReceiverHandler } from '@/modules/receiver/applications/commands/createReceiver/createReceiver.handler';
import { GetReceiverByNameOrNullHandler } from '@/modules/receiver/applications/queries/getReceiverByNameOrNull/getReceiverByNameOrNull.handler';
import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';

@Module({
    imports: [CqrsModule],
    providers: [CreateReceiverHandler, GetReceiverByNameOrNullHandler, ReceiverRepository],
})
export class ReceiverModule {}
