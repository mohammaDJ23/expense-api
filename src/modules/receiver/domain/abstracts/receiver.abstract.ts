import type { IReceiverAbstract } from '@/modules/receiver/domain/interfaces/receiverAbstract.interface';

export abstract class ReceiverAbstract implements Partial<IReceiverAbstract> {
    public readonly id?: string;
    public readonly name?: string;
    public readonly createdAt?: string;
    public readonly updatedAt?: string;

    constructor(data: Partial<IReceiverAbstract>) {
        this.id = data.id;
        this.name = data.name;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
