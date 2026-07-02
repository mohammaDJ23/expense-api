import type { IInsertConsumer } from '@/modules/consumer/infrastructure/schemas/consumer.schema';

interface IProps extends Required<Omit<IInsertConsumer, 'id'>> {}

export class CreateConsumerCommand {
    constructor(public readonly props: IProps) {}
}
