import type { IBillConsumerAbstract } from '@/modules/consumer/domain/interfaces/billConsumerAbstract.interface';

export class CreateManyBillConsumerCommand {
    constructor(public readonly billConsumers: Required<Omit<IBillConsumerAbstract, 'id'>>[]) {}
}
