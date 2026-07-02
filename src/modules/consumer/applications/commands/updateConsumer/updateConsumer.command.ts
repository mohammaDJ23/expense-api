import type { IInsertConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

interface IProps extends Required<Omit<IInsertConsumer, 'createdAt'>> {}

export class UpdateConsumerCommand {
    constructor(public readonly props: IProps) {}
}
