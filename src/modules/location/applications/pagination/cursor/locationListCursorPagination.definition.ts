import { Injectable } from '@nestjs/common';
import { isDateString, isUUID } from 'class-validator';

import type { ICursorPaginationDefinition } from '@/core/features/pagination/cursor/cursorPaginationDefinition.interface';
import type { ILocationListCursor } from '@/modules/location/domain/types/locationListCursor.type';
import type { ISelectLocation } from '@/modules/location/infrastructure/schemas/location.schema';

@Injectable()
export class LocationListCursorPaginationDefinition implements ICursorPaginationDefinition<
    ISelectLocation,
    ILocationListCursor
> {
    create(source: ISelectLocation): ILocationListCursor {
        return {
            id: source.id,
            createdAt: source.createdAt,
        };
    }

    validate(payload: Partial<ILocationListCursor> | null | undefined): boolean {
        return isDateString(payload?.createdAt) && isUUID(payload?.id);
    }
}
