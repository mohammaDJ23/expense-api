import type {
    TInsertUserConsumer,
    TSelectUserConsumer,
} from '@/modules/consumer/infrastructure/schemas/userConsumer.schema';

export interface IUserConsumerRepository {
    createMany(data: TInsertUserConsumer[]): Promise<TSelectUserConsumer[]>;
    getManyById(
        data: Pick<TSelectUserConsumer, 'userId' | 'consumerId'>[],
    ): Promise<TSelectUserConsumer[]>;
}
