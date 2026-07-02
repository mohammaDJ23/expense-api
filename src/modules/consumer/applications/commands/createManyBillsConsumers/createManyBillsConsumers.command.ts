import type { ISelectBillConsumer } from '@/modules/consumer/infrastructure/schemas/billConsumer.schema';

interface IProps {
    billsConsumers: Required<Omit<ISelectBillConsumer, 'id'>>[];
}

export class CreateManyBillsConsumersCommand {
    constructor(public readonly props: IProps) {}
}
