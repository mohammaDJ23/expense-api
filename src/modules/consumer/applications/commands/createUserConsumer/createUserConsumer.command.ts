import { UserConsumerAbstract } from '@/modules/consumer/domain/abstracts/userConsumer.abstract';

export class CreateUserConsumerCommand extends UserConsumerAbstract {
    public readonly userId: string;
    public readonly consumerId: string;
    public readonly createdAt: Date;

    constructor(data: Required<Pick<UserConsumerAbstract, 'userId' | 'consumerId' | 'createdAt'>>) {
        super(data);

        this.userId = data.userId;
        this.consumerId = data.consumerId;
        this.createdAt = data.createdAt;
    }
}
