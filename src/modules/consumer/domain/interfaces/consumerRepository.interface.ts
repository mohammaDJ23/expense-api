import type {
    TInsertConsumer,
    TSelectConsumer,
} from '@/modules/consumer/infrastructure/schemas/consumer.schema';

export interface IConsumerRepository {
    create(data: TInsertConsumer): Promise<TSelectConsumer>;
    getByIdOrNull(id: string): Promise<TSelectConsumer | null>;
}
