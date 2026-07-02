import type { IInsertReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

interface IProps extends Required<Omit<IInsertReceiver, 'id'>> {}

export class CreateReceiverCommand {
    constructor(public readonly props: IProps) {}
}
