import fs from 'fs';

export function readSecret(secretPath: string): string {
    try {
        return fs.readFileSync(secretPath, 'utf8').trim();
    } catch {
        throw new Error('Could not read the secret');
    }
}
