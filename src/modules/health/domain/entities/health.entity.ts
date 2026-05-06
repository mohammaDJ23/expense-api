import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';

import type { IHealth } from '@/modules/health/domain/interfaces/health.interface';
import type { HealthIndicatorResult, HealthIndicatorStatus } from '@nestjs/terminus';

export class HealthEntity implements IHealth {
    public readonly timestamp: string;
    public readonly name: string;
    public readonly status: HealthIndicatorStatus;
    public readonly details: Record<string, unknown>;

    private constructor(data: IHealth) {
        this.timestamp = data.timestamp;
        this.name = data.name;
        this.status = data.status;
        this.details = data.details;
    }

    static create(
        name: string,
        status: HealthIndicatorStatus,
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

    toJSON(): HealthIndicatorResult {
        return {
            [this.name]: {
                status: this.status,
                timestamp: this.timestamp,
                details: this.details,
            },
        };
    }
}
