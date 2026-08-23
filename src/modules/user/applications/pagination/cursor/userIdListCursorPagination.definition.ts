import { Injectable } from '@nestjs/common';
import { isUUID } from 'class-validator';

import type { ICursorPaginationDefinition } from '@/core/features/pagination/cursor/cursorPaginationDefinition.interface';
import type { IUserIdListCursor } from '@/modules/user/domain/types/userIdListCursor.type';

@Injectable()
export class UserIdListCursorPaginationDefinition implements ICursorPaginationDefinition<
    string,
    IUserIdListCursor
> {
    create(source: string): IUserIdListCursor {
        return {
            id: source,
        };
    }

    validate(payload: Partial<IUserIdListCursor> | null | undefined): boolean {
        return isUUID(payload?.id);
    }
}
