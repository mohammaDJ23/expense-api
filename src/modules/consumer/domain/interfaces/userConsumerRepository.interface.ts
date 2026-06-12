import type {
    TInsertUserConsumer,
    TSelectUserConsumer,
} from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

export interface IUserConsumerRepository {
    createMany(data: TInsertUserConsumer[]): Promise<TSelectUserConsumer[]>;
    getManyById(userId: string, consumerIds: string[]): Promise<TSelectUserConsumer[]>;
}
