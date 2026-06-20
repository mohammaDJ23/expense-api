import type { ISelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

export interface ITargetBillConsumer extends ISelectConsumer {
    billId: string;
}
