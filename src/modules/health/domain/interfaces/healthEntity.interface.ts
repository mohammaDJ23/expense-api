import type { HealthIndicatorStatus } from '@nestjs/terminus';

export interface IHealth {
    readonly timestamp: string;
    readonly name: string;
    readonly status: HealthIndicatorStatus;
    readonly details: Record<string, unknown>;
}
