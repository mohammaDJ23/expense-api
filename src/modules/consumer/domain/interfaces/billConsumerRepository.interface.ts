import type {
    TInsertBillConsumer,
    TSelectBillConsumer,
} from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';

export interface IBillConsumerRepository {
    createMany(data: TInsertBillConsumer[]): Promise<TSelectBillConsumer[]>;
}
