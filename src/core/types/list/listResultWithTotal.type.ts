import type { ICursorPagination } from '@/core/features/pagination/cursor/cursorPagination.type';
import type { ITotal } from '@/core/types/total.type';

export interface IListResultWithTotal<T, C> extends ICursorPagination<T, C>, ITotal {}
