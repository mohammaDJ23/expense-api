import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { AuthenticationModule } from '@/core/authentication/authentication.module';
import { CreateReceiverHandler } from '@/modules/receiver/applications/commands/createReceiver/createReceiver.handler';
import { CreateUserReceiverHandler } from '@/modules/receiver/applications/commands/createUserReceiver/createUserReceiver.handler';
import { GetReceiverByIdOrThrowHandler } from '@/modules/receiver/applications/queries/getReceiverByIdOrThrow/getReceiverByIdOrThrow.handler';
import { GetReceiverByNameOrNullHandler } from '@/modules/receiver/applications/queries/getReceiverByNameOrNull/getReceiverByNameOrNull.handler';
import { GetUserReceiverByIdOrNullHandler } from '@/modules/receiver/applications/queries/getUserReceiverByIdOrNull/getUserReceiverByIdOrNull.handler';
import { CreateReceiverService } from '@/modules/receiver/applications/services/createReceiver.service';
import { CreateUserReceiverService } from '@/modules/receiver/applications/services/createUserReceiver.service';
import { CreateUserReceiverIfNotExistsService } from '@/modules/receiver/applications/services/createUserReceiverIfNotExists.service';
import { GetReceiverByIdOrThrowService } from '@/modules/receiver/applications/services/getReceiverByIdOrThrow.service';
import { GetReceiverByNameOrCreateService } from '@/modules/receiver/applications/services/getReceiverByNameOrCreate.service';
import { GetReceiverByNameOrNullService } from '@/modules/receiver/applications/services/getReceiverByNameOrNull.service';
import { GetUserReceiverByIdOrNullService } from '@/modules/receiver/applications/services/getUserReceiverByIdOrNull.service';
import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';
import { UserReceiverRepository } from '@/modules/receiver/infrastructure/repositories/userReceiver.repository';
import { ReceiverController } from '@/modules/receiver/interfaces/controllers/v1.controller';

@Module({
    imports: [CqrsModule, AuthenticationModule],
    controllers: [ReceiverController],
    providers: [
        CreateReceiverService,
        GetReceiverByNameOrNullService,
        GetReceiverByNameOrCreateService,
        CreateUserReceiverService,
        CreateUserReceiverIfNotExistsService,
        GetUserReceiverByIdOrNullService,
        GetReceiverByIdOrThrowService,
        GetReceiverByIdOrThrowHandler,
        CreateReceiverHandler,
        CreateUserReceiverHandler,
        GetReceiverByNameOrNullHandler,
        GetUserReceiverByIdOrNullHandler,
        ReceiverRepository,
        UserReceiverRepository,
    ],
    exports: [GetReceiverByNameOrCreateService, CreateUserReceiverIfNotExistsService],
})
export class ReceiverModule {}
