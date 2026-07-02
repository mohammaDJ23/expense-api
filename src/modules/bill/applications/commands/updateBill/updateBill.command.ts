import type { IInsertBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

type TProps = Partial<Omit<IInsertBill, 'createdAt'>> &
    Required<Pick<IInsertBill, 'id' | 'userId' | 'updatedAt'>>;

export class UpdateBillCommand {
    constructor(public readonly props: TProps) {}
}
