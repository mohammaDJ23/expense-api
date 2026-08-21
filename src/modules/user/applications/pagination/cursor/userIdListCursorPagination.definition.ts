import { Injectable } from '@nestjs/common';
import { isUUID } from 'class-validator';

import type { ICursorPaginationDefinition } from '@/core/features/pagination/cursor/cursorPaginationDefinition.interface';
import type { IId } from '@/core/types/id.type';
import type { IUserIdListCursor } from '@/modules/user/domain/types/userIdListCursor.type';

@Injectable()
export class UserIdListCursorPaginationDefinition implements ICursorPaginationDefinition<
    IId,
    IUserIdListCursor
> {
    create(source: IId): IUserIdListCursor {
        return {
            id: source.id,
        };
    }

    validate(payload: Partial<IUserIdListCursor> | null | undefined): boolean {
        return isUUID(payload?.id);
    }
}
