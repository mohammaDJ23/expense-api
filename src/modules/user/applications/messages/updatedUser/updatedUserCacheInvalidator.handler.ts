import { MessageHandler } from '@/core/features/message/messageHandler.decorator';
import { UserCacheInvalidatorProcessor } from '@/modules/user/applications/messages/userCacheInvalidator.processor';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@MessageHandler()
export class UpdatedUserCacheInvalidatorHandler implements IMessageHandler<ISelectUser> {
    route: TOutboxEventRoute = 'users.updated';

    constructor(private readonly userCacheInvalidatorProcessor: UserCacheInvalidatorProcessor) {}

    async execute(batch: IMessageBatch<ISelectUser>[]): Promise<void> {
        await this.userCacheInvalidatorProcessor.process({
            userIds: batch.map((item) => item.payload.id),
        });
    }
}
