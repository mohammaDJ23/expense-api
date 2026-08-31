import pLimit from 'p-limit';

import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { LocalResetPasswordMailerService } from '@/modules/authentication/applications/services/localResetPasswordMailer.service';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ILocalResetPasswordMessagePayload } from '@/modules/authentication/domain/types/localResetPasswordMessagePayload.type';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';

@MessageHandler()
export class SendLocalResetPasswordEmailHandler implements IMessageHandler<ILocalResetPasswordMessagePayload> {
    route: TOutboxEventRoute = 'local_reset_password.created';
    private readonly concurrency = pLimit(2);

    constructor(
        private readonly localResetPasswordMailerService: LocalResetPasswordMailerService,
    ) {}

    async execute(batch: IMessageBatch<ILocalResetPasswordMessagePayload>[]): Promise<void> {
        await Promise.allSettled(
            batch.map((item) =>
                this.concurrency(() =>
                    this.localResetPasswordMailerService.execute({
                        email: item.payload.email,
                    }),
                ),
            ),
        );
    }
}
