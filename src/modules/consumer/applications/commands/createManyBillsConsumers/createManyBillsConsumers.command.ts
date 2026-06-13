import type { IBillConsumerAbstract } from '@/modules/consumer/domain/interfaces/billConsumerAbstract.interface';

export class CreateManyBillsConsumersCommand {
    constructor(public readonly billsConsumers: Required<Omit<IBillConsumerAbstract, 'id'>>[]) {}
}
