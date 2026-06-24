import { ConsumerAbstract } from '@/modules/consumer/domain/abstracts/consumer.abstract';

import type { IConsumerAbstract } from '@/modules/consumer/domain/interfaces/consumerAbstract.interface';

export class CreateConsumerCommand extends ConsumerAbstract {
    public override readonly name: string;
    public override readonly createdAt: string;
    public override readonly updatedAt: string;

    constructor(data: Required<Omit<IConsumerAbstract, 'id'>>) {
        super(data);

        this.name = data.name;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
