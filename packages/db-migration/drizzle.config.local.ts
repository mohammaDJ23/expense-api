import { resolve } from 'path';

import { defineConfig, type Config } from 'drizzle-kit';

export default defineConfig({
    dialect: 'postgresql',
    schema: resolve(__dirname, '../../src/**/infrastructure/schemas/**/*.schema.ts'),
    out: './drizzle',
    verbose: true,
    strict: true,
} as Config);
