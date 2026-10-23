import { resolve } from 'path';

import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'postgresql',
    schema: resolve(__dirname, '../src/**/infrastructure/schemas/**/*.schema.ts'),
    out: './drizzle',
    verbose: true,
    strict: true,
});
