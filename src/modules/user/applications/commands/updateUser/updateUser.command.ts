import { UserCommand } from '@/modules/user/applications/commands/common/user.command';

import type { TSelectUser } from '@/modules/user/infrastructure/schemas/user.schema';

export class UpdateUserCommand extends UserCommand {
    constructor(
        public readonly id: string,
        data: Partial<TSelectUser>,
    ) {
        super(data);
    }
}
