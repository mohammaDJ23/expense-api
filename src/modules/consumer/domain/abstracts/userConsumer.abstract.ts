import type { IUserConsumerAbstract } from '@/modules/consumer/domain/interfaces/userConsumerAbstract.interface';

export abstract class UserConsumerAbstract implements Partial<IUserConsumerAbstract> {
    public readonly id?: string;
    public readonly userId?: string;
    public readonly consumerId?: string;
    public readonly createdAt?: Date;

    constructor(data: Partial<IUserConsumerAbstract>) {
        this.id = data.id;
        this.userId = data.userId;
        this.consumerId = data.consumerId;
        this.createdAt = data.createdAt;
    }
}
