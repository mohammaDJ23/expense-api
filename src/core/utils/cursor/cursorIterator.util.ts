import type { IListResult } from '@/core/types/listResult.type';

export async function* cursorIterator<T>(
    fetchPage: (cursor: string | null) => Promise<IListResult<T>>,
): AsyncGenerator<T[], void, void> {
    let cursor: string | null = null;

    while (true) {
        const result = await fetchPage(cursor);

        yield result.items;

        if (!result.hasNextPage) {
            break;
        }

        cursor = result.nextCursor;
    }
}
