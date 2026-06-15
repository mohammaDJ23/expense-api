import type { IUserReceiverAbstract } from '@/modules/receiver/domain/interfaces/userReceiverAbstract.interface';

export abstract class UserReceiverAbstract implements Partial<IUserReceiverAbstract> {
    public readonly id?: string;
    public readonly userId?: string;
    public readonly receiverId?: string;
    public readonly createdAt?: string;

    constructor(data: Partial<IUserReceiverAbstract>) {
        this.id = data.id;
        this.userId = data.userId;
        this.receiverId = data.receiverId;
        this.createdAt = data.createdAt;
    }
}
