import type { HealthIndicatorStatus } from '@nestjs/terminus';

export interface IHealthEntity {
    readonly timestamp: string;
    readonly name: string;
    readonly status: HealthIndicatorStatus;
    readonly details: Record<string, unknown>;
}
