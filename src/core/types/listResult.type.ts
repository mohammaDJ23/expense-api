import type { ITotal } from './total.type';
import type { ICursorPagination } from '@/core/utils/pagination/cursorPagination.type';

export interface IListResult<T> extends ICursorPagination<T>, ITotal {}
