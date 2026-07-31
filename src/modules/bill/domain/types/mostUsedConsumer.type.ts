import type { ITotal } from '@/core/types/total.type';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

export interface IMostUsedConsumer extends ISelectConsumer, ITotal {}
