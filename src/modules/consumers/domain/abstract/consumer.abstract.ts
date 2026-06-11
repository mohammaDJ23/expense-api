import type { IConsumerAbstract } from '@/modules/consumers/domain/interfaces/consumerAbstract.interface';

export abstract class ConsumerAbstract implements Partial<IConsumerAbstract> {
    public readonly id?: string;
    public readonly name?: string;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;

    constructor(data: Partial<IConsumerAbstract>) {
        this.id = data.id;
        this.name = data.name;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
    }
}
