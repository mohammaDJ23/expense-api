import type { IUserConsumerAbstract } from '@/modules/consumer/domain/interfaces/userConsumerAbstract.interface';

export class CreateManyUsersConsumersCommand {
    constructor(public readonly usersConsumers: Required<Omit<IUserConsumerAbstract, 'id'>>[]) {}
}
