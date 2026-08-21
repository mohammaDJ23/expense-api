import { Injectable } from '@nestjs/common';
import { isDateString, isUUID } from 'class-validator';

import type { ICursorPaginationDefinition } from '@/core/features/pagination/cursor/cursorPaginationDefinition.interface';
import type { IUserListCursor } from '@/modules/user/domain/types/userListCursor.type';
import type { ISelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

@Injectable()
export class UserListCursorPaginationDefinition implements ICursorPaginationDefinition<
    ISelectUser,
    IUserListCursor
> {
    create(source: ISelectUser): IUserListCursor {
        return {
            id: source.id,
            createdAt: source.createdAt,
        };
    }

    validate(payload: Partial<IUserListCursor> | null | undefined): boolean {
        return isDateString(payload?.createdAt) && isUUID(payload?.id);
    }
}
