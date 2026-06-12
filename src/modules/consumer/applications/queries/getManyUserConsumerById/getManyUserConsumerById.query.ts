import type { IUserConsumerAbstract } from '@/modules/consumer/domain/interfaces/userConsumerAbstract.interface';

export class GetManyUserConsumerByIdQuery {
    constructor(
        public readonly data: Required<Pick<IUserConsumerAbstract, 'userId' | 'consumerId'>>[],
    ) {}
}
