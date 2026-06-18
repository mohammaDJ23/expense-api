import type { TSelectReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';
import type {
    TInsertUserReceiver,
    TSelectUserReceiver,
} from '@/modules/receiver/infrastructure/schemas/userReceiver.schema';

export interface IUserReceiverRepository {
    create(data: TInsertUserReceiver): Promise<TSelectUserReceiver>;
    getByIdOrNull(userId: string, receiverId: string): Promise<TSelectUserReceiver | null>;
    getJoinedByIdOThrow(userId: string, receiverId: string): Promise<TSelectReceiver>;
}
