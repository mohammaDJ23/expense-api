import type { THealthIndicatorResult } from './healthIndicatorResult.interface';

export interface IHealthIndicator {
    check(): Promise<THealthIndicatorResult>;
}
