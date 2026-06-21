import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@/core/authentication/authentication.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateReceiverHandler } from '@/modules/receiver/applications/commands/createReceiver/createReceiver.handler';
import { CreateUserReceiverHandler } from '@/modules/receiver/applications/commands/createUserReceiver/createUserReceiver.handler';
import { FindManyReceiversByIdsHandler } from '@/modules/receiver/applications/queries/findManyReceiversByIds/findManyReceiversByIds.handler';
import { FindReceiverByIdOrThrowHandler } from '@/modules/receiver/applications/queries/findReceiverByIdOrThrow/findReceiverByIdOrThrow.handler';
import { FindReceiverByNameOrNullHandler } from '@/modules/receiver/applications/queries/findReceiverByNameOrNull/findReceiverByNameOrNull.handler';
import { FindUserReceiverByRefIdAndTargetIdOrNullHandler } from '@/modules/receiver/applications/queries/findUserReceiverByRefIdAndTargetIdOrNull/findUserReceiverByRefIdAndTargetIdOrNull.handler';
import { FindUserReceiverTargetsByRefIdHandler } from '@/modules/receiver/applications/queries/findUserReceiverTargetsByRefId/findUserReceiverTargetsByRefId.handler';
import { UserReceiverService } from '@/modules/receiver/applications/services/userReceiver.service';
import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';
import { UserReceiverRepository } from '@/modules/receiver/infrastructure/repositories/userReceiver.repository';
import { ReceiverController } from '@/modules/receiver/interfaces/controllers/v1.controller';

@Module({
    imports: [CqrsModule, AuthenticationModule],
    controllers: [ReceiverController],
    providers: [
        UserReceiverService,
        CreateReceiverHandler,
        CreateUserReceiverHandler,
        FindReceiverByNameOrNullHandler,
        FindUserReceiverByRefIdAndTargetIdOrNullHandler,
        FindReceiverByIdOrThrowHandler,
        FindManyReceiversByIdsHandler,
        FindUserReceiverTargetsByRefIdHandler,
        ReceiverRepository,
        UserReceiverRepository,
    ],
})
export class ReceiverModule {}
