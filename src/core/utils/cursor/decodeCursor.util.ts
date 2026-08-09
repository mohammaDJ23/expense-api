import { isDateString, isUUID } from 'class-validator';

import type { ICursor } from './cursor.type';

export function decodeCursor(cursor: string): ICursor {
    try {
        const decoded = Buffer.from(cursor, 'base64url').toString('utf8');

        const payload = JSON.parse(decoded);

        if (!isDateString(payload.createdAt) || !isUUID(payload.id)) {
            throw new Error('Invalid cursor');
        }

        return payload;
    } catch {
        throw new Error('Invalid cursor');
    }
}
