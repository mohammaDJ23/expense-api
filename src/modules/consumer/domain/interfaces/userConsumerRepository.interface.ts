import type {
    TInsertUserConsumer,
    TSelectUserConsumer,
} from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

export interface IUserConsumerRepository {
    create(data: TInsertUserConsumer): Promise<TSelectUserConsumer>;
    getByIdOrNull(userId: string, consumerId: string): Promise<TSelectUserConsumer | null>;
}
