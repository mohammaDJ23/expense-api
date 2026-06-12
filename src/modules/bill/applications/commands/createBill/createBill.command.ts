import { BillAbstract } from '@/modules/bill/domain/abstracts/bill.abstract';

export class CreateBillCommand extends BillAbstract {
    public override readonly amount: string;
    public override readonly description: string;
    public override readonly purchasedAt: Date | null;
    public override readonly createdAt: Date;
    public override readonly updatedAt: Date;
    public override readonly userId: string;
    public override readonly consumerId: string;
    public override readonly receiverId: string;
    public override readonly locationId: string;

    constructor(data: Required<Omit<BillAbstract, 'id'>>) {
        super(data);

        this.amount = data.amount;
        this.description = data.description;
        this.purchasedAt = data.purchasedAt;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.userId = data.userId;
        this.consumerId = data.consumerId;
        this.receiverId = data.receiverId;
        this.locationId = data.locationId;
    }
}
