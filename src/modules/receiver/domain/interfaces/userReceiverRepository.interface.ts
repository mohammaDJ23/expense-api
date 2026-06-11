import type {
    TInsertUserReceiver,
    TSelectUserReceiver,
} from '@/modules/receiver/infrastructure/schemas/userReceiver.schema';

export interface IUserReceiverRepository {
    create(data: TInsertUserReceiver): Promise<TSelectUserReceiver>;
    getByIdOrNull(userId: string, receiverId: string): Promise<TSelectUserReceiver | null>;
}
