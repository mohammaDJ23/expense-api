import type { IListResult } from '@/core/types/list/listResult.type';

export async function* cursorIterator<T>(
    fetchPage: (cursor: string | null) => Promise<IListResult<T>>,
): AsyncGenerator<T[], void, void> {
    let nextCursor: string | null = null;

    while (true) {
        const result = await fetchPage(nextCursor);

        yield result.items;

        if (!result.hasNextPage) {
            break;
        }

        nextCursor = result.nextCursor;
    }
}
