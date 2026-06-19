import type {
    TInsertBillConsumer,
    TSelectBillConsumer,
} from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';
import type { TSelectConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

export interface IBillConsumerRepository {
    createMany(data: TInsertBillConsumer[]): Promise<TSelectBillConsumer[]>;
    getManyJoinedById(billId: string, consumerIds: string[]): Promise<TSelectConsumer[]>;
}
