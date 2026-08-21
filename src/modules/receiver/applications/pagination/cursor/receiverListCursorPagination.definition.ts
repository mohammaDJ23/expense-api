import { Injectable } from '@nestjs/common';
import { isDateString, isUUID } from 'class-validator';

import type { ICursorPaginationDefinition } from '@/core/features/pagination/cursor/cursorPaginationDefinition.interface';
import type { IReceiverListCursor } from '@/modules/receiver/domain/types/receiverListCursor.type';
import type { ISelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

@Injectable()
export class ReceiverListCursorPaginationDefinition implements ICursorPaginationDefinition<
    ISelectReceiver,
    IReceiverListCursor
> {
    create(source: ISelectReceiver): IReceiverListCursor {
        return {
            id: source.id,
            createdAt: source.createdAt,
        };
    }

    validate(payload: Partial<IReceiverListCursor> | null | undefined): boolean {
        return isDateString(payload?.createdAt) && isUUID(payload?.id);
    }
}
