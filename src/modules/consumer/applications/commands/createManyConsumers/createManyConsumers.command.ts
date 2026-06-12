import type { IConsumerAbstract } from '@/modules/consumer/domain/interfaces/consumerAbstract.interface';

export class CreateManyConsumersCommand {
    constructor(public readonly consumers: Required<Omit<IConsumerAbstract, 'id'>>[]) {}
}
