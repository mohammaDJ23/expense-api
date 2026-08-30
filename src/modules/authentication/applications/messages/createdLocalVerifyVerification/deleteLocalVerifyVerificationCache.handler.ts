import pLimit from 'p-limit';

import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { VerificationStorageService } from '@/modules/authentication/applications/services/verificationStorage.service';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ILocalResetPasswordMessagePayload } from '@/modules/authentication/domain/types/localResetPasswordMessagePayload.type';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';

@MessageHandler()
export class DeleteLocalVerifyVerificationCacheHandler implements IMessageHandler<ILocalResetPasswordMessagePayload> {
    route: TOutboxEventRoute = 'local_verify_verification.created';
    private readonly concurrency = pLimit(2);

    constructor(private readonly verificationStorageService: VerificationStorageService) {}

    async execute(batch: IMessageBatch<ILocalResetPasswordMessagePayload>[]): Promise<void> {
        await Promise.allSettled(
            batch.map((item) =>
                this.concurrency(() => this.verificationStorageService.delete(item.payload.email)),
            ),
        );
    }
}
