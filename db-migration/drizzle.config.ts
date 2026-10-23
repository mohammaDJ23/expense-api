import fs from 'fs';
import { resolve } from 'path';

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

const isDev = env.require('NODE_ENV') === 'development';

const schemaRoot = resolve(__dirname, isDev ? '../src' : './src');

export default defineConfig({
    dialect: 'postgresql',
    schema: resolve(schemaRoot, '**/infrastructure/schemas/**/*.schema.ts'),
    out: './drizzle',
    dbCredentials: isDev
        ? {}
        : {
              url: `postgresql://${env.require('DATABASE_USER')}:${encodeURIComponent(readSecret(env.require('DATABASE_PASSWORD_FILE')))}@${env.require('DATABASE_HOST')}:${parseInt(env.require('DATABASE_PORT'), 10)}/${env.require('DATABASE_NAME')}`,
          },
    verbose: true,
    strict: true,
});
