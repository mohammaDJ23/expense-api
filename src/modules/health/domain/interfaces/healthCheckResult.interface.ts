import type { THealthIndicatorResult } from './healthIndicatorResult.interface';
import type { THealthIndicatorStatus } from './healthIndicatorStatus.interface';

export interface IHealthCheckResult {
    status: THealthIndicatorStatus;
    details: THealthIndicatorResult;
}
