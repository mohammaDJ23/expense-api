import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool, type PoolClient } from 'pg';

import { readSecret } from '@/core/utils/readSecret.util';

import { DRIZZLE_CLIENT_TOKEN } from './drizzle.constants';

@Global()
@Module({
    providers: [
        {
            provide: DRIZZLE_CLIENT_TOKEN,
            useFactory: async (configService: ConfigService): Promise<NodePgDatabase> => {
                const pool = new Pool({
                    host: configService.getOrThrow<string>('DATABASE_HOST'),
                    port: parseInt(configService.getOrThrow<string>('DATABASE_PORT'), 10),
                    user: configService.getOrThrow<string>('DATABASE_USER'),
                    password: readSecret(
                        configService.getOrThrow<string>('DATABASE_PASSWORD_FILE'),
                    ),
                    database: configService.getOrThrow<string>('DATABASE_NAME'),
                    min: parseInt(configService.getOrThrow<string>('DATABASE_POOL_MIN'), 10),
                    max: parseInt(configService.getOrThrow<string>('DATABASE_POOL_MAX'), 10),
                    connectionTimeoutMillis: parseInt(
                        configService.getOrThrow<string>('DATABASE_CONNECTION_TIMEOUT'),
                        10,
                    ),
                    idleTimeoutMillis: parseInt(
                        configService.getOrThrow<string>('DATABASE_IDLE_TIMEOUT'),
                        10,
                    ),
                    maxLifetimeSeconds: parseInt(
                        configService.getOrThrow<string>('DATABASE_MAX_LIFETIME'),
                        10,
                    ),
                    ssl:
                        configService.getOrThrow<string>('DATABASE_SSL') === 'true'
                            ? { rejectUnauthorized: false }
                            : false,
                });

                let client: PoolClient | undefined;
                try {
                    client = await pool.connect();
                    await client.query('SELECT 1');

                    return drizzle({
                        client: pool,
                        casing: 'camelCase',
                    });
                } catch {
                    await pool.end();
                    throw new Error('Could not initiate the database');
                } finally {
                    if (client) {
                        client.release();
                    }
                }
            },
            inject: [ConfigService],
        },
    ],
    exports: [DRIZZLE_CLIENT_TOKEN],
})
export class DrizzleClientModule {}
