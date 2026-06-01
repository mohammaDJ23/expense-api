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
        url: `postgresql://${env.require('DATABASE_USER')}:${encodeURIComponent(readSecret(env.require('DATABASE_PASSWORD_FILE')))}@${env.require('DATABASE_HOST')}:${parseInt(env.require('DATABASE_PORT'), 10)}/${env.require('DATABASE_NAME')}`,
    },
    verbose: true,
    strict: true,
});
