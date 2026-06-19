import type { IJoinedBillConsumer } from '@/modules/consumer/domain/interfaces/billConsumer.interface';
import type {
    TInsertBillConsumer,
    TSelectBillConsumer,
} from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';

export interface IBillConsumerRepository {
    createMany(data: TInsertBillConsumer[]): Promise<TSelectBillConsumer[]>;
    getManyJoinedByIdOrThrow(billIds: string[]): Promise<IJoinedBillConsumer[]>;
}
