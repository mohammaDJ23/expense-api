import type { IBillAbstract } from '@/modules/bill/domain/interfaces/billAbstract.interface';

export abstract class BillAbstract implements Partial<IBillAbstract> {
    public readonly id?: string;
    public readonly amount?: string;
    public readonly description?: string;
    public readonly purchasedAt?: Date | null;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
    public readonly userId?: string;
    public readonly receiverId?: string;
    public readonly locationId?: string;

    constructor(data: Partial<IBillAbstract>) {
        this.id = data.id;
        this.amount = data.amount;
        this.description = data.description;
        this.purchasedAt = data.purchasedAt;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.userId = data.userId;
        this.receiverId = data.receiverId;
        this.locationId = data.locationId;
    }
}
