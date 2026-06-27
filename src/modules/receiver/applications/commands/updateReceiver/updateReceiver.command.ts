import { ReceiverAbstract } from '@/modules/receiver/domain/abstracts/receiver.abstract';

export class UpdateReceiverCommand extends ReceiverAbstract {
    public override readonly id: string;
    public override readonly name: string;
    public override readonly userId: string;
    public override readonly updatedAt: string;

    constructor(data: Required<Omit<ReceiverAbstract, 'createdAt'>>) {
        super(data);

        this.id = data.id;
        this.name = data.name;
        this.userId = data.userId;
        this.updatedAt = data.updatedAt;
    }
}
