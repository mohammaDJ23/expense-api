import fs from 'fs';

import { Env } from '@humanwhocodes/env';
import { defineConfig } from 'drizzle-kit';

const env = new Env();

function readSecret(filePath: string): string {
    try {
        return fs.readFileSync(filePath, 'utf8').trim();
    } catch {
        throw new Error('Failed to read secret');
    }
}

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/**/*.schema.ts',
    out: './drizzle',
    dbCredentials: {
        host: env.require('DATABASE_HOST'),
        port: parseInt(env.require('DATABASE_PORT'), 10),
        user: env.require('DATABASE_USER'),
        password: readSecret(env.require('DATABASE_PASSWORD_FILE')),
        database: env.require('DATABASE_NAME'),
    },
    verbose: true,
    strict: true,
});
