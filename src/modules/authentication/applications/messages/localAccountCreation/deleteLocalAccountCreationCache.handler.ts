import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { concurrency } from '@/core/utils/concurrency.util';
import { LocalAccountStorageService } from '@/modules/authentication/applications/services/localAccountStorage.service';
import { AuthenticationMessageEvent } from '@/modules/authentication/domain/enums/authenticationMessageEvent.enum';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ILocalAccountCreationMessagePayload } from '@/modules/authentication/domain/types/localAccountCreationMessagePayload.type';

@MessageHandler(AuthenticationMessageEvent.LOCAL_ACCOUNT_CREATION)
export class DeleteLocalAccountCreationCacheHandler implements IMessageHandler<ILocalAccountCreationMessagePayload> {
    constructor(private readonly localAccountStorageService: LocalAccountStorageService) {}

    async execute(batch: IMessageBatch<ILocalAccountCreationMessagePayload>[]): Promise<void> {
        await Promise.allSettled(
            batch.map((item) =>
                concurrency(() => this.localAccountStorageService.delete(item.payload.email)),
            ),
        );
    }
}
