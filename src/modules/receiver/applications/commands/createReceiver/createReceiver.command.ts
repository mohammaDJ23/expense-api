import { ReceiverAbstract } from '@/modules/receiver/domain/abstracts/receiver.abstract';

export class CreateReceiverCommand extends ReceiverAbstract {
    public override readonly name: string;
    public override readonly createdAt: Date;
    public override readonly updatedAt: Date;

    constructor(data: Required<Omit<ReceiverAbstract, 'id'>>) {
        super(data);

        this.name = data.name;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
