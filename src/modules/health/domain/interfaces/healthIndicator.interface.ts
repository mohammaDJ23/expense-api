import type { THealthIndicatorResult } from '@/modules/health/domain/types/healthIndicatorResult.type';

export interface IHealthIndicator {
    check(): Promise<THealthIndicatorResult>;
}
