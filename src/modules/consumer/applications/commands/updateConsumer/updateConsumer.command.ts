import { ConsumerAbstract } from '@/modules/consumer/domain/abstracts/consumer.abstract';

export class UpdateConsumerCommand extends ConsumerAbstract {
    public override readonly id: string;
    public override readonly name: string;
    public override readonly userId: string;
    public override readonly updatedAt: string;

    constructor(data: Required<Omit<ConsumerAbstract, 'createdAt'>>) {
        super(data);

        this.id = data.id;
        this.name = data.name;
        this.userId = data.userId;
        this.updatedAt = data.updatedAt;
    }
}
