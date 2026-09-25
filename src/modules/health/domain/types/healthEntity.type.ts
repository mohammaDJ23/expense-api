import type { IndicatorHealthStatus } from '@/modules/health/domain/enums/indicatorHealthStatus.enum';

export interface IHealthEntity {
    readonly timestamp: string;
    readonly name: string;
    readonly status: IndicatorHealthStatus;
    readonly details: Record<string, unknown>;
}
