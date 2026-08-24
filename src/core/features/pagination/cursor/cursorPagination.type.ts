export interface ICursorPagination<T, C> {
    items: T[];
    hasNextPage: boolean;
    nextCursor: C | null;
}
