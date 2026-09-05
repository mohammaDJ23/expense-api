import { Cacheable } from '@/core/features/queryCache/cacheable.decorator';
import { UserResource } from '@/modules/user/domain/enums/user.enum';

import type { IUserListCursor } from '@/modules/user/domain/types/userListCursor.type';

interface IProps {
    limit: number;
    cursor: IUserListCursor | null;
}

@Cacheable<FindUserListQuery>({
    namespace: UserResource.USER,
})
export class FindUserListQuery {
    constructor(public readonly props: IProps) {}
}
