export interface ICursorPagination<T> {
    items: T[];
    hasNextPage: boolean;
    nextCursor: string | null;
}
