import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { concurrency } from '@/core/utils/concurrency.util';
import { LocalSignupInitiationMailerService } from '@/modules/authentication/applications/services/localSignupInitiationMailer.service';
import { LocalSignupStorageService } from '@/modules/authentication/applications/services/localSignupStorage.service';
import { AuthenticationMessageEvent } from '@/modules/authentication/domain/enums/authenticationMessageEvent.enum';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ILocalSignupInitiationMessagePayload } from '@/modules/authentication/domain/types/localSignupInitiationMessagePayload.type';

@MessageHandler(AuthenticationMessageEvent.LOCAL_SIGNUP_INITIATION)
export class SendSignupInitiationEmailHandler implements IMessageHandler<ILocalSignupInitiationMessagePayload> {
    constructor(
        private readonly localSignupStorageService: LocalSignupStorageService,
        private readonly localSignupInitiationMailerService: LocalSignupInitiationMailerService,
    ) {}

    async execute(batch: IMessageBatch<ILocalSignupInitiationMessagePayload>[]): Promise<void> {
        await Promise.allSettled(
            batch.map((item) =>
                concurrency(async () => {
                    await this.localSignupStorageService.delete(item.payload.email);
                    await this.localSignupStorageService.set(
                        item.payload.email,
                        item.payload.token,
                    );
                    await this.localSignupInitiationMailerService.execute({
                        email: item.payload.email,
                        token: item.payload.token,
                    });
                }),
            ),
        );
    }
}
