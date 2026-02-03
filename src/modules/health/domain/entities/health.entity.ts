import type { HealthIndicatorResult, HealthIndicatorStatus } from '@nestjs/terminus';

import { getCurrentUTCTimestamp } from 'src/common/utils/getCurrentUTCTimestamp.util';

export class HealthEntity {
    private readonly timestamp: string;

    private constructor(
        private readonly name: string,
        private readonly status: HealthIndicatorStatus,
        private readonly details: Record<string, unknown> = {},
    ) {
        this.timestamp = getCurrentUTCTimestamp();
    }

    static create(
        name: string,
        status: HealthIndicatorStatus,
        details?: Record<string, unknown>,
    ): HealthEntity {
        return new HealthEntity(name, status, details);
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
