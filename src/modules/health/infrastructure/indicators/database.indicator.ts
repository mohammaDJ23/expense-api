import { Injectable } from '@nestjs/common';
import { HealthIndicatorResult } from '@nestjs/terminus';
import { InjectDataSource } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { DATABASE_NAME } from 'src/common/constants';

import { HealthEntity } from '../../domain/entities/health.entity';
import { IHealthIndicator } from '../../domain/interfaces/healthIndicator.interface';

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
