import { ConsumerAbstract } from '@/modules/consumer/domain/abstracts/consumer.abstract';

export class CreateConsumerCommand extends ConsumerAbstract {
    public override readonly name: string;
    public override readonly createdAt: Date;
    public override readonly updatedAt: Date;

    constructor(data: Required<Pick<ConsumerAbstract, 'name' | 'createdAt' | 'updatedAt'>>) {
        super(data);

        this.name = data.name;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
