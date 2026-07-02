import type { IInsertReceiver } from '@/modules/receiver/infrastructure/schemas/receiver.schema';

type TProps = Required<Omit<IInsertReceiver, 'createdAt'>>;

export class UpdateReceiverCommand {
    constructor(public readonly props: TProps) {}
}
