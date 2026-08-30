import { Injectable } from '@nestjs/common';
import { isDateString, isUUID } from 'class-validator';

import type { ICursorPaginationDefinition } from '@/core/features/pagination/cursor/cursorPaginationDefinition.interface';
import type { IEmailIdentityListCursor } from '@/modules/authentication/domain/types/emailIdentityListCursor.type';
import type { ISelectEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';

@Injectable()
export class EmailIdentityListCursorPaginationDefinition implements ICursorPaginationDefinition<
    ISelectEmailIdentity,
    IEmailIdentityListCursor
> {
    create(source: ISelectEmailIdentity): IEmailIdentityListCursor {
        return {
            id: source.id,
            createdAt: source.createdAt,
        };
    }

    validate(payload: Partial<IEmailIdentityListCursor> | null | undefined): boolean {
        return isDateString(payload?.createdAt) && isUUID(payload?.id);
    }
}
