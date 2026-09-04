import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { concurrency } from '@/core/utils/concurrency.util';
import { PasswordMailerService } from '@/modules/authentication/applications/services/passwordMailer.service';
import { PasswordStorageService } from '@/modules/authentication/applications/services/passwordStorage.service';
import { AuthenticationMessageEvent } from '@/modules/authentication/domain/enums/authenticationMessageEvent.enum';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ILocalForgotPasswordMessagePayload } from '@/modules/authentication/domain/types/localForgotPasswordMessagePayload.type';

@MessageHandler(AuthenticationMessageEvent.LOCAL_FORGOT_PASSWORD)
export class SendForgotPasswordEmailHandler implements IMessageHandler<ILocalForgotPasswordMessagePayload> {
    constructor(
        private readonly passwordMailerService: PasswordMailerService,
        private readonly passwordStorageService: PasswordStorageService,
    ) {}

    async execute(batch: IMessageBatch<ILocalForgotPasswordMessagePayload>[]): Promise<void> {
        await Promise.allSettled(
            batch.map((item) =>
                concurrency(async () => {
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
