import type { THealthIndicatorStatus } from './healthIndicatorStatus.type';

export interface IHealthEntity {
    readonly timestamp: string;
    readonly name: string;
    readonly status: THealthIndicatorStatus;
    readonly details: Record<string, unknown>;
}
