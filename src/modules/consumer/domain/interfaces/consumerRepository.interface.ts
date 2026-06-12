import type {
    TInsertConsumer,
    TSelectConsumer,
} from '@/modules/consumer/infrastructure/schemas/consumer.schema';

export interface IConsumerRepository {
    create(data: TInsertConsumer): Promise<TSelectConsumer>;
    createMany(data: TInsertConsumer[]): Promise<TSelectConsumer[]>;
    getByNameOrNull(name: string): Promise<TSelectConsumer | null>;
    getManyByName(names: string[]): Promise<TSelectConsumer[]>;
}
