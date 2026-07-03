import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@/core/authentication/authentication.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { CreateReceiverHandler } from '@/modules/receiver/applications/commands/createReceiver/createReceiver.handler';
import { DeleteReceiverHandler } from '@/modules/receiver/applications/commands/deleteReceiver/deleteReceiver.handler';
import { UpdateReceiverHandler } from '@/modules/receiver/applications/commands/updateReceiver/updateReceiver.handler';
import { ExistsReceiverByUserIdAndExcludingIdAndNameHandler } from '@/modules/receiver/applications/queries/existsReceiverByUserIdAndExcludingIdAndName/existsReceiverByUserIdAndExcludingIdAndName.handler';
import { ExistsReceiverByUserIdAndIdHandler } from '@/modules/receiver/applications/queries/existsReceiverByUserIdAndId/existsReceiverByUserIdAndId.handler';
import { FindManyReceiversByUserIdAndIdsHandler } from '@/modules/receiver/applications/queries/findManyReceiversByUserIdAndIds/findManyReceiversByUserIdAndIds.handler';
import { FindReceiverByUserIdAndIdOrNullHandler } from '@/modules/receiver/applications/queries/findReceiverByUserIdAndIdOrNull/findReceiverByUserIdAndIdOrNull.handler';
import { FindReceiverByUserIdAndIdOrThrowHandler } from '@/modules/receiver/applications/queries/findReceiverByUserIdAndIdOrThrow/findReceiverByUserIdAndIdOrThrow.handler';
import { FindReceiverByUserIdAndNameOrNullHandler } from '@/modules/receiver/applications/queries/findReceiverByUserIdAndNameOrNull/findReceiverByUserIdAndNameOrNull.handler';
import { FindReceiverListByUserIdHandler } from '@/modules/receiver/applications/queries/findReceiverListByUserId/findReceiverListByUserId.handler';
import { CreateReceiverService } from '@/modules/receiver/applications/services/createReceiver.service';
import { DeleteReceiverService } from '@/modules/receiver/applications/services/deleteReceiver.service';
import { ReceiverService } from '@/modules/receiver/applications/services/receiver.service';
import { UpdateReceiverService } from '@/modules/receiver/applications/services/updateReceiver.service';
import { ReceiverRepository } from '@/modules/receiver/infrastructure/repositories/receiver.repository';
import { ReceiverController } from '@/modules/receiver/interfaces/controllers/v1.controller';

@Module({
    imports: [CqrsModule, AuthenticationModule],
    controllers: [ReceiverController],
    providers: [
        CreateReceiverHandler,
        DeleteReceiverHandler,
        UpdateReceiverHandler,
        FindManyReceiversByUserIdAndIdsHandler,
        FindReceiverByUserIdAndIdOrNullHandler,
        FindReceiverByUserIdAndIdOrThrowHandler,
        FindReceiverByUserIdAndNameOrNullHandler,
        FindReceiverListByUserIdHandler,
        ExistsReceiverByUserIdAndIdHandler,
        ExistsReceiverByUserIdAndExcludingIdAndNameHandler,
        ReceiverService,
        CreateReceiverService,
        UpdateReceiverService,
        DeleteReceiverService,
        ReceiverRepository,
    ],
})
export class ReceiverModule {}
