import type { THealthIndicatorResult } from './healthIndicatorResult.type';

type TStatus = 'ok' | 'error';

export interface IHealthCheckResult {
    status: TStatus;
    details: THealthIndicatorResult;
}
