import { Injectable, type OnModuleInit, type OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { readSecret } from '@/common/utils/readSecret.util';
import { AppException } from '@/core/exceptions/app/exception';

@Injectable()
export class DrizzleConnectionService implements OnModuleInit, OnModuleDestroy {
    private nodePgDatabase: NodePgDatabase | null = null;
    private pool: Pool | null = null;

    constructor(private readonly configService: ConfigService) {}

    async onModuleInit(): Promise<void> {
        this.pool = new Pool({
            host: this.configService.getOrThrow<string>('DATABASE_HOST'),
            port: parseInt(this.configService.getOrThrow<string>('DATABASE_PORT'), 10),
            user: this.configService.getOrThrow<string>('DATABASE_USER'),
            password: readSecret(this.configService.getOrThrow<string>('DATABASE_PASSWORD_FILE')),
            database: this.configService.getOrThrow<string>('DATABASE_NAME'),
        });

        try {
            await this.pool.connect();
            this.nodePgDatabase = drizzle({
                client: this.pool,
                casing: 'camelCase',
            });
        } catch {
            throw new AppException('Database initialization failed');
        }
    }

    async onModuleDestroy(): Promise<void> {
        if (this.pool) {
            try {
                await this.pool.end();
            } catch {
                throw new AppException('Database destroying failed');
            }
        }
    }

    getDatabase(): NodePgDatabase {
        if (!this.nodePgDatabase) {
            throw new AppException('Database not initialized and module not started yet');
        }
        return this.nodePgDatabase;
    }
}
