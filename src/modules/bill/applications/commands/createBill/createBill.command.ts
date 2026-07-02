import type { IInsertBill } from '@/modules/bill/infrastructure/schemas/bill.schema';

interface IProps extends Required<Omit<IInsertBill, 'id'>> {}

export class CreateBillCommand {
    constructor(public readonly props: IProps) {}
}
