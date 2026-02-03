import type { HealthIndicatorResult } from '@nestjs/terminus';

export interface IHealthIndicator {
    check: () => Promise<HealthIndicatorResult>;
}
