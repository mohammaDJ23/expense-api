import pLimit from 'p-limit';

import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { PasswordStorageService } from '@/modules/authentication/applications/services/passwordStorage.service';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ILocalResetPasswordMessagePayload } from '@/modules/authentication/domain/types/localResetPasswordMessagePayload.type';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';

@MessageHandler()
export class DeleteLocalResetPasswordCacheHandler implements IMessageHandler<ILocalResetPasswordMessagePayload> {
    route: TOutboxEventRoute = 'local_reset_password.created';
    private readonly concurrency = pLimit(2);

    constructor(private readonly passwordStorageService: PasswordStorageService) {}

    async execute(batch: IMessageBatch<ILocalResetPasswordMessagePayload>[]): Promise<void> {
        await Promise.allSettled(
            batch.map((item) =>
                this.concurrency(() => this.passwordStorageService.delete(item.payload.email)),
            ),
        );
    }
}
