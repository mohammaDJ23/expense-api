import type { TCursor } from './cursor.type';

export interface ICursorPaginationDefinition<T, C extends TCursor> {
    create(source: T): C;
    validate(payload: Partial<C> | null | undefined): boolean;
}
