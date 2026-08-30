import pLimit from 'p-limit';

import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { PasswordMailerService } from '@/modules/authentication/applications/services/passwordMailer.service';
import { PasswordStorageService } from '@/modules/authentication/applications/services/passwordStorage.service';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ILocalForgotPasswordMessagePayload } from '@/modules/authentication/domain/types/localForgotPasswordMessagePayload.type';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';

@MessageHandler()
export class SendEmailForgotPasswordHandler implements IMessageHandler<ILocalForgotPasswordMessagePayload> {
    route: TOutboxEventRoute = 'local_forgot_password.created';
    private readonly concurrency = pLimit(2);

    constructor(
        private readonly passwordMailerService: PasswordMailerService,
        private readonly passwordStorageService: PasswordStorageService,
    ) {}

    async execute(batch: IMessageBatch<ILocalForgotPasswordMessagePayload>[]): Promise<void> {
        await Promise.allSettled(
            batch.map((item) =>
                this.concurrency(async () => {
                    await this.passwordStorageService.delete(item.payload.email);
                    await this.passwordStorageService.set(item.payload.email, item.payload.token);
                    await this.passwordMailerService.execute({
                        email: item.payload.email,
                        token: item.payload.token,
                    });
                }),
            ),
        );
    }
}
