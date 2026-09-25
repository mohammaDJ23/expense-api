import type { THealthIndicatorResult } from './healthIndicatorResult.type';
import type { HealthStatus } from '@/modules/health/domain/enums/healthStatus.enum';

export interface IHealthCheckResult {
    status: HealthStatus;
    details: THealthIndicatorResult;
}
