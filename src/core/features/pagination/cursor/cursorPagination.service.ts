import { Injectable } from '@nestjs/common';

import type { TCursor } from './cursor.type';
import type { ICursorPagination } from './cursorPagination.type';
import type { ICursorPaginationDefinition } from './cursorPaginationDefinition.interface';
import type { IListResult } from '@/core/types/list/listResult.type';

@Injectable()
export class CursorPaginationService {
    encode<C extends TCursor>(cursor: C): string {
        return Buffer.from(JSON.stringify(cursor)).toString('base64url');
    }

    decode<T, C extends TCursor>(
        cursor: string | null,
        definition: ICursorPaginationDefinition<T, C>,
    ): C | null {
        try {
            if (!cursor) {
                return null;
            }

            const decoded = Buffer.from(cursor, 'base64url').toString('utf8');
            const payload = JSON.parse(decoded);

            if (!definition.validate(payload)) {
                throw new Error();
            }

            return payload;
        } catch {
            throw new Error('Invalid cursor');
        }
    }

    paginate<T, C extends TCursor>(
        items: T[],
        limit: number,
        definition: ICursorPaginationDefinition<T, C>,
    ): ICursorPagination<T> {
        const hasNextPage = items.length > limit;
        const data = hasNextPage ? items.slice(0, limit) : items;
        const lastItem = data.at(-1);
        const nextCursor =
            hasNextPage && lastItem ? this.encode(definition.create(lastItem)) : null;

        return {
            items: data,
            nextCursor,
            hasNextPage,
        };
    }

    async *cursorIterator<T>(
        fetch: (cursor: string | null) => Promise<IListResult<T>>,
    ): AsyncGenerator<T[], void, void> {
        let cursor: string | null = null;

        while (true) {
            const page = await fetch(cursor);

            yield page.items;

            if (!page.hasNextPage) {
                return;
            }

            cursor = page.nextCursor;
        }
    }

    async *cursorItemsIterator<T>(
        fetch: (cursor: string | null) => Promise<IListResult<T>>,
    ): AsyncGenerator<T, void, void> {
        for await (const items of this.cursorIterator(fetch)) {
            yield* items;
        }
    }
}
