import { BillAbstract } from '@/modules/bill/domain/abstracts/bill.abstract';

export class UpdateBillCommand extends BillAbstract {
    public override readonly id: string;
    public override readonly userId: string;
    public override readonly updatedAt: string;

    constructor(
        data: Partial<Omit<BillAbstract, 'createdAt'>> &
            Required<Pick<BillAbstract, 'id' | 'userId' | 'updatedAt'>>,
    ) {
        super(data);

        this.id = data.id;
        this.userId = data.userId;
        this.updatedAt = data.updatedAt;
    }
}
