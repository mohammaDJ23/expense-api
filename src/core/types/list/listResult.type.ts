import type { ICursorPagination } from '@/core/features/pagination/cursor/cursorPagination.type';

export interface IListResult<T> extends ICursorPagination<T> {}
