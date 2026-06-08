import { UserAbstract } from '@/modules/user/domain/abstracts/user.abstract';

export class UpdateUserCommand extends UserAbstract {
    public override readonly id: string;
    public override readonly updatedAt: Date;

    constructor(data: UserAbstract & Required<Pick<UserAbstract, 'updatedAt' | 'id'>>) {
        super(data);

        this.id = data.id;
        this.updatedAt = data.updatedAt;
    }
}
