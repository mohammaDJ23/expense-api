import type { IJoinedBillConsumer } from '@/modules/consumer/domain/interfaces/billConsumer.interface';
import type {
    TInsertBillConsumer,
    TSelectBillConsumer,
} from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';

export interface IBillConsumerRepository {
    createMany(data: TInsertBillConsumer[]): Promise<TSelectBillConsumer[]>;
    getManyJoinedById(billIds: string[]): Promise<IJoinedBillConsumer[]>;
}
