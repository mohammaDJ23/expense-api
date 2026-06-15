import { UserReceiverAbstract } from '@/modules/receiver/domain/abstracts/userReceiver.abstract';

export class CreateUserReceiverCommand extends UserReceiverAbstract {
    public override readonly userId: string;
    public override readonly receiverId: string;
    public override readonly createdAt: string;

    constructor(data: Required<Omit<UserReceiverAbstract, 'id'>>) {
        super(data);

        this.userId = data.userId;
        this.receiverId = data.receiverId;
        this.createdAt = data.createdAt;
    }
}
