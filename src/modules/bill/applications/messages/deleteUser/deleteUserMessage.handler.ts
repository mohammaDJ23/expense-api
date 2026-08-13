import { MessageHandler } from '@/core/features/message/messageHandler.decorator';

import { DeleteUserMessageElasticsearchProcessor } from './deletedUserMessageElasticsearch.processor';

import type { IMessageBatch } from '@/core/features/message/messageBatch.type';
import type { IMessageHandler } from '@/core/features/message/messageHandler.interface';
import type { IMessageProcessor } from '@/core/features/message/messageProcessor.interface';
import type { TOutboxEventRoute } from '@/modules/outbox/domain/types/outboxEventRoute.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@MessageHandler()
export class DeleteUserMessageHandler implements IMessageHandler<ISelectUser> {
    route: TOutboxEventRoute = 'users.deleted';

    constructor(
        private readonly deleteUserMessageElasticsearchProcessor: DeleteUserMessageElasticsearchProcessor,
    ) {}

    async execute(batch: IMessageBatch<ISelectUser>[]): Promise<void> {
        const processors: IMessageProcessor<ISelectUser>[] = [
            this.deleteUserMessageElasticsearchProcessor,
        ];
        await Promise.all(processors.map((processor) => processor.process(batch)));
    }
}
