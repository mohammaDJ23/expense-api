import fs from 'fs';

import { AppException } from '../kernel/exceptions/app.exception';

export function readSecret(secretPath: string): string {
    try {
        return fs.readFileSync(secretPath, 'utf8').trim();
    } catch (error) {
        throw new AppException(error);
    }
}
