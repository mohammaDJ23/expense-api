import { getCurrentUTCTimestamp } from '@/core/utils/getCurrentUTCTimestamp.util';

import type { IHealthEntity } from '@/modules/health/domain/types/healthEntity.type';
import type { THealthIndicatorResult } from '@/modules/health/domain/types/healthIndicatorResult.type';
import type { THealthIndicatorStatus } from '@/modules/health/domain/types/healthIndicatorStatus.type';

export class HealthEntity implements IHealthEntity {
    public readonly timestamp: string;
    public readonly name: string;
    public readonly status: THealthIndicatorStatus;
    public readonly details: Record<string, unknown>;

    private constructor(data: IHealthEntity) {
        this.timestamp = data.timestamp;
        this.name = data.name;
        this.status = data.status;
        this.details = data.details;
    }

    static create(
        name: string,
        status: THealthIndicatorStatus,
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
        return HealthEntity.create(name, 'up', details);
    }

    static down(name: string, details?: Record<string, unknown>): HealthEntity {
        return HealthEntity.create(name, 'down', details);
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
