import type { IInsertEmailIdentity } from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';

type TProps = Required<Omit<IInsertEmailIdentity, 'id'>>;

export class CreateEmailIdentityCommand {
    constructor(public readonly props: TProps) {}
}
