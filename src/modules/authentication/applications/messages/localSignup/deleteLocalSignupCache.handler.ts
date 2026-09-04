import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { concurrency } from '@/core/utils/concurrency.util';
import { LocalSignupStorageService } from '@/modules/authentication/applications/services/localSignupStorage.service';
import { AuthenticationMessageEvent } from '@/modules/authentication/domain/enums/authenticationMessageEvent.enum';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ILocalSignupMessagePayload } from '@/modules/authentication/domain/types/localSignupMessagePayload.type';

@MessageHandler(AuthenticationMessageEvent.LOCAL_SIGNUP)
export class DeleteLocalSignupCacheHandler implements IMessageHandler<ILocalSignupMessagePayload> {
    constructor(private readonly localSignupStorageService: LocalSignupStorageService) {}

    async execute(batch: IMessageBatch<ILocalSignupMessagePayload>[]): Promise<void> {
        await Promise.allSettled(
            batch.map((item) =>
                concurrency(() => this.localSignupStorageService.delete(item.payload.email)),
            ),
        );
    }
}
