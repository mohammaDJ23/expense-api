import { decodeCursor } from './decodeCursor.util';

import type { ICursor } from './cursor.type';

export function parseCursor(cursor: string | null): ICursor | null {
    return cursor ? decodeCursor(cursor) : null;
}
