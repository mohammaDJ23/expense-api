import { Injectable } from '@nestjs/common';
import { isDateString, isUUID } from 'class-validator';

import type { ICursorPaginationDefinition } from '@/core/features/pagination/cursor/cursorPaginationDefinition.interface';
import type { IConsumerListCursor } from '@/modules/consumer/domain/types/consumerListCursor.type';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

@Injectable()
export class ConsumerListCursorPaginationDefinition implements ICursorPaginationDefinition<
    ISelectConsumer,
    IConsumerListCursor
> {
    create(source: ISelectConsumer): IConsumerListCursor {
        return {
            id: source.id,
            createdAt: source.createdAt,
        };
    }

    validate(payload: Partial<IConsumerListCursor> | null | undefined): boolean {
        return isDateString(payload?.createdAt) && isUUID(payload?.id);
    }
}
