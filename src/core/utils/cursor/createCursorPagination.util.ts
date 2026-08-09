import { encodeCursor } from './encodeCursor.util';

import type { ICursor } from './cursor.type';
import type { ICursorPagination } from './cursorPagination.type';

export function createCursorPagination<T extends ICursor>(
    items: T[],
    limit: number,
): ICursorPagination<T> {
    const hasNextPage = items.length > limit;

    const data = hasNextPage ? items.slice(0, limit) : items;

    const lastItem = data.at(-1);

    const nextCursor =
        hasNextPage && lastItem
            ? encodeCursor({
                  createdAt: lastItem.createdAt,
                  id: lastItem.id,
              })
            : null;

    return {
        items: data,
        nextCursor,
        hasNextPage,
    };
}
