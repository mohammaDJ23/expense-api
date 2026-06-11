import { UserReceiverAbstract } from '@/modules/receiver/domain/abstracts/userReceiver.abstract';

export class CreateUserReceiverCommand extends UserReceiverAbstract {
    public readonly userId: string;
    public readonly receiverId: string;
    public readonly createdAt: Date;

    constructor(data: Required<Pick<UserReceiverAbstract, 'userId' | 'receiverId' | 'createdAt'>>) {
        super(data);

        this.userId = data.userId;
        this.receiverId = data.receiverId;
        this.createdAt = data.createdAt;
    }
}
