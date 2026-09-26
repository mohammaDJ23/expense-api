import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';
import { IndicatorHealthStatus } from '@/modules/health/domain/enums/indicatorHealthStatus.enum';

import type { IHealthEntity } from '@/modules/health/domain/types/healthEntity.type';
import type { THealthIndicatorResult } from '@/modules/health/domain/types/healthIndicatorResult.type';

export class HealthEntity implements IHealthEntity {
    public readonly timestamp: string;
    public readonly name: string;
    public readonly status: IndicatorHealthStatus;
    public readonly details: Record<string, unknown>;

    private constructor(data: IHealthEntity) {
        this.timestamp = data.timestamp;
        this.name = data.name;
        this.status = data.status;
        this.details = data.details;
    }

    static create(
        name: string,
        status: IndicatorHealthStatus,
        details: Record<string, unknown> = {},
    ): HealthEntity {
        return new HealthEntity({
            name,
            status,
            details,
            timestamp: getCurrentUTCTimestamp(),
        });
    }

    static up(name: string, details?: Record<string, unknown>): HealthEntity {
        return HealthEntity.create(name, IndicatorHealthStatus.UP, details);
    }

    static down(name: string, details?: Record<string, unknown>): HealthEntity {
        return HealthEntity.create(name, IndicatorHealthStatus.DOWN, details);
    }

    toJSON(): THealthIndicatorResult {
        return {
            [this.name]: {
                status: this.status,
                timestamp: this.timestamp,
                details: this.details,
                name: this.name,
            },
        };
    }
}
