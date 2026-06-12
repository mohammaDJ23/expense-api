import type { IUserConsumerAbstract } from '@/modules/consumer/domain/interfaces/userConsumerAbstract.interface';

export class CreateManyUserConsumerCommand {
    constructor(public readonly userConsumers: Required<Omit<IUserConsumerAbstract, 'id'>>[]) {}
}
