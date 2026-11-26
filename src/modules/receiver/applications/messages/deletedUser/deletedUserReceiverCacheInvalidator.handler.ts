import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { concurrency } from '@/core/utils/concurrency.util';
import { ReceiverCacheInvalidatorService } from '@/modules/receiver/infrastructure/cache/receiverCacheInvalidator.service';
import { UserMessageEvent } from '@/modules/user/domain/enums/userMessageEvent.enum';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@MessageHandler(UserMessageEvent.DELETED_USER)
export class DeletedUserReceiverCacheInvalidatorHandler implements IMessageHandler<ISelectUser> {
    constructor(
        private readonly receiverCacheInvalidatorService: ReceiverCacheInvalidatorService,
    ) {}

    async execute(batch: IMessageBatch<ISelectUser>[]): Promise<void> {
        await Promise.all(
            batch.map((item) =>
                concurrency(() =>
                    this.receiverCacheInvalidatorService.execute({ userId: item.payload.id }),
                ),
            ),
        );
    }
}
