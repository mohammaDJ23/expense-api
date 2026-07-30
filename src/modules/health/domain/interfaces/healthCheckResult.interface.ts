import type { THealthIndicatorResult } from './healthIndicatorResult.interface';

type TStatus = 'ok' | 'error';

export interface IHealthCheckResult {
    status: TStatus;
    details: THealthIndicatorResult;
}
