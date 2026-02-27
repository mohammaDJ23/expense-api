import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { DATABASE_NAME } from '@/common/infrastructure/database/database.constants';
import { HealthEntity } from '@/modules/health/domain/entities/health.entity';

import type { IHealthIndicator } from '@/modules/health/domain/interfaces/healthIndicator.interface';
import type { HealthIndicatorResult } from '@nestjs/terminus';

@Injectable()
export class DatabaseIndicator implements IHealthIndicator {
    constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

    async check(): Promise<HealthIndicatorResult> {
        try {
            await this.dataSource.query('SELECT 1');

            return HealthEntity.up(DATABASE_NAME).toJSON();
        } catch (error) {
            return HealthEntity.down(DATABASE_NAME, { error }).toJSON();
        }
    }
}
