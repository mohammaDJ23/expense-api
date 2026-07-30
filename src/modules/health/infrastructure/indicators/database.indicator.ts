import { Injectable } from '@nestjs/common';
import { sql } from 'drizzle-orm';

import { DATABASE_NAME } from '@/infrastructure/database/database.constants';
import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { HealthEntity } from '@/modules/health/domain/entities/health.entity';

import type { IHealthIndicator } from '@/modules/health/domain/interfaces/healthIndicator.interface';
import type { THealthIndicatorResult } from '@/modules/health/domain/interfaces/healthIndicatorResult.interface';

@Injectable()
export class DatabaseIndicator extends DrizzleRepository implements IHealthIndicator {
    async check(): Promise<THealthIndicatorResult> {
        try {
            await this.db.execute(sql`SELECT 1`);

            return HealthEntity.up(DATABASE_NAME).toJSON();
        } catch (error) {
            return HealthEntity.down(DATABASE_NAME, { error }).toJSON();
        }
    }
}
