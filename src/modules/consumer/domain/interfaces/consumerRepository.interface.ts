import type {
    TInsertConsumer,
    TSelectConsumer,
} from '@/modules/consumer/infrastructure/schemas/consumer.schema';

export interface IConsumerRepository {
    createMany(data: TInsertConsumer[]): Promise<TSelectConsumer[]>;
    getManyByName(names: string[]): Promise<TSelectConsumer[]>;
}
