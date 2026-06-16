import { Module } from '@nestjs/common';

import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateReceiverHandler } from '@/modules/receiver/applications/commands/createReceiver/createReceiver.handler';
import { CreateUserReceiverHandler } from '@/modules/receiver/applications/commands/createUserReceiver/createUserReceiver.handler';
import { GetReceiverByNameOrNullHandler } from '@/modules/receiver/applications/queries/getReceiverByNameOrNull/getReceiverByNameOrNull.handler';
import { GetUserReceiverByIdOrNullHandler } from '@/modules/receiver/applications/queries/getUserReceiverByIdOrNull/getUserReceiverByIdOrNull.handler';
import { CreateReceiverService } from '@/modules/receiver/applications/services/createReceiver.service';
import { GetReceiverByNameOrCreateService } from '@/modules/receiver/applications/services/getReceiverByNameOrCreate.service';
import { GetReceiverByNameOrNullService } from '@/modules/receiver/applications/services/getReceiverByNameOrNull.service';
import { UserReceiverService } from '@/modules/receiver/applications/services/userReceiver.service';
import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';
import { UserReceiverRepository } from '@/modules/receiver/infrastructure/repositories/userReceiver.repository';

@Module({
    imports: [CqrsModule],
    providers: [
        UserReceiverService,
        CreateReceiverService,
        GetReceiverByNameOrNullService,
        GetReceiverByNameOrCreateService,
        CreateReceiverHandler,
        CreateUserReceiverHandler,
        GetReceiverByNameOrNullHandler,
        GetUserReceiverByIdOrNullHandler,
        ReceiverRepository,
        UserReceiverRepository,
    ],
    exports: [GetReceiverByNameOrCreateService, UserReceiverService],
})
export class ReceiverModule {}
