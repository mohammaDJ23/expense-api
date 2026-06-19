import type { TSelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

export interface IJoinedBillConsumer extends TSelectConsumer {
    billId: string;
}
