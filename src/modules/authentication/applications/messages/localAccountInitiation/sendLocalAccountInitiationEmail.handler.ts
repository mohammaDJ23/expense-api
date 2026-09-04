import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { concurrency } from '@/core/utils/concurrency.util';
import { LocalAccountInitiationMailerService } from '@/modules/authentication/applications/services/localAccountInitiationMailer.service';
import { LocalAccountStorageService } from '@/modules/authentication/applications/services/localAccountStorage.service';
import { AuthenticationMessageEvent } from '@/modules/authentication/domain/enums/authenticationMessageEvent.enum';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ILocalAccountInitiationMessagePayload } from '@/modules/authentication/domain/types/localAccountInitiationMessagePayload.type';

@MessageHandler(AuthenticationMessageEvent.LOCAL_ACCOUNT_INITIATION)
export class SendLocalAccountInitiationEmailHandler implements IMessageHandler<ILocalAccountInitiationMessagePayload> {
    constructor(
        private readonly localAccountStorageService: LocalAccountStorageService,
        private readonly localAccountInitiationMailerService: LocalAccountInitiationMailerService,
    ) {}

    async execute(batch: IMessageBatch<ILocalAccountInitiationMessagePayload>[]): Promise<void> {
        await Promise.allSettled(
            batch.map((item) =>
                concurrency(async () => {
                    await this.localAccountStorageService.delete(item.payload.email);
                    await this.localAccountStorageService.set(
                        item.payload.email,
                        item.payload.token,
                    );
                    await this.localAccountInitiationMailerService.execute({
                        email: item.payload.email,
                        token: item.payload.token,
                    });
                }),
            ),
        );
    }
}
