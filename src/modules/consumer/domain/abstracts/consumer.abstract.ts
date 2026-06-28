import type { IConsumerAbstract } from '@/modules/consumer/domain/interfaces/consumerAbstract.interface';

export abstract class ConsumerAbstract implements Partial<IConsumerAbstract> {
    public readonly id?: string;
    public readonly name?: string;
    public readonly userId?: string;
    public readonly createdAt?: string;
    public readonly updatedAt?: string;

    constructor(data: Partial<IConsumerAbstract>) {
        this.id = data.id;
        this.name = data.name;
        this.userId = data.userId;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
