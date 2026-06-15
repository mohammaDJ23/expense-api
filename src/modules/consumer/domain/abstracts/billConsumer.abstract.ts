import type { IBillConsumerAbstract } from '@/modules/consumer/domain/interfaces/billConsumerAbstract.interface';

export abstract class BillConsumerAbstract implements Partial<IBillConsumerAbstract> {
    public readonly id?: string;
    public readonly billId?: string;
    public readonly consumerId?: string;
    public readonly createdAt?: string;

    constructor(data: Partial<IBillConsumerAbstract>) {
        this.id = data.id;
        this.billId = data.billId;
        this.consumerId = data.consumerId;
        this.createdAt = data.createdAt;
    }
}
