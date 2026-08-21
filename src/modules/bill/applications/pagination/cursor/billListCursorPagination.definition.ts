import { Injectable } from '@nestjs/common';
import { isDateString, isUUID } from 'class-validator';

import type { ICursorPaginationDefinition } from '@/core/features/pagination/cursor/cursorPaginationDefinition.interface';
import type { IBill } from '@/modules/bill/domain/types/bill.type';
import type { IBillListCursor } from '@/modules/bill/domain/types/billListCursor.type';

@Injectable()
export class BillListCursorPaginationDefinition implements ICursorPaginationDefinition<
    IBill,
    IBillListCursor
> {
    create(source: IBill): IBillListCursor {
        return {
            id: source.id,
            createdAt: source.createdAt,
        };
    }

    validate(payload: Partial<IBillListCursor> | null | undefined): boolean {
        return isDateString(payload?.createdAt) && isUUID(payload?.id);
    }
}
