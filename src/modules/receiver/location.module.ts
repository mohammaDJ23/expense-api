import { Module } from '@nestjs/common';

import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateReceiverHandler } from '@/modules/receiver/applications/commands/createReceiver/createReceiver.handler';
import { CreateUserReceiverHandler } from '@/modules/receiver/applications/commands/createUserReceiver/createUserReceiver.handler';
import { GetReceiverByNameOrNullHandler } from '@/modules/receiver/applications/queries/getReceiverByNameOrNull/getReceiverByNameOrNull.handler';
import { GetUserReceiverByIdOrNullHandler } from '@/modules/receiver/applications/queries/getUserReceiverByIdOrNull/getUserReceiverByIdOrNull.handler';
import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';
import { UserReceiverRepository } from '@/modules/receiver/infrastructure/repositories/userReceiver.repository';

@Module({
    imports: [CqrsModule],
    providers: [
        CreateReceiverHandler,
        CreateUserReceiverHandler,
        GetReceiverByNameOrNullHandler,
        GetUserReceiverByIdOrNullHandler,
        ReceiverRepository,
        UserReceiverRepository,
    ],
})
export class ReceiverModule {}
