import type { ICursor } from './cursor.type';

export function encodeCursor(cursor: ICursor): string {
    return Buffer.from(JSON.stringify(cursor)).toString('base64url');
}
