import type {
    TInsertConsumer,
    TSelectConsumer,
} from '@/modules/consumers/infrastructure/schemas/consumer.schema';

export interface IConsumerRepository {
    create(data: TInsertConsumer): Promise<TSelectConsumer>;
    getByIdOrNull(id: string): Promise<TSelectConsumer | null>;
}
