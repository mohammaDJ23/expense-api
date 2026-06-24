import { UserConsumerAbstract } from '@/modules/consumer/domain/abstracts/userConsumer.abstract';

import type { IUserConsumerAbstract } from '@/modules/consumer/domain/interfaces/userConsumerAbstract.interface';

export class CreateUserConsumerCommand extends UserConsumerAbstract {
    public override readonly userId: string;
    public override readonly consumerId: string;
    public override readonly createdAt: string;

    constructor(data: Required<Omit<IUserConsumerAbstract, 'id'>>) {
        super(data);

        this.userId = data.userId;
        this.consumerId = data.consumerId;
        this.createdAt = data.createdAt;
    }
}
