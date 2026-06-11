import type {
    TInsertReceiver,
    TSelectReceiver,
} from '@/modules/receiver/infrastructure/schemas/receiver.schema';

export interface IReceiverRepository {
    create(data: TInsertReceiver): Promise<TSelectReceiver>;
    getByNameOrNull(name: string): Promise<TSelectReceiver | null>;
}
