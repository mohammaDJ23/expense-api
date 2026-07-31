import type { ITotal } from '@/core/interfaces/total.interface';
import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

export interface IMostUsedConsumer extends ISelectConsumer, ITotal {}
