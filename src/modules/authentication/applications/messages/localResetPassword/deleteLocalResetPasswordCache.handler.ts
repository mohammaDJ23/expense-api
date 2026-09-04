import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { concurrency } from '@/core/utils/concurrency.util';
import { PasswordStorageService } from '@/modules/authentication/applications/services/passwordStorage.service';
import { AuthenticationMessageEvent } from '@/modules/authentication/domain/enums/authenticationMessageEvent.enum';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ILocalResetPasswordMessagePayload } from '@/modules/authentication/domain/types/localResetPasswordMessagePayload.type';

@MessageHandler(AuthenticationMessageEvent.LOCAL_RESET_PASSWORD)
export class DeleteLocalResetPasswordCacheHandler implements IMessageHandler<ILocalResetPasswordMessagePayload> {
    constructor(private readonly passwordStorageService: PasswordStorageService) {}

    async execute(batch: IMessageBatch<ILocalResetPasswordMessagePayload>[]): Promise<void> {
        await Promise.allSettled(
            batch.map((item) =>
                concurrency(() => this.passwordStorageService.delete(item.payload.email)),
            ),
        );
    }
}
