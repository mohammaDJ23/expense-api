import type { THealthIndicatorStatus } from './healthIndicatorStatus.interface';

export interface IHealthEntity {
    readonly timestamp: string;
    readonly name: string;
    readonly status: THealthIndicatorStatus;
    readonly details: Record<string, unknown>;
}
