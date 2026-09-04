import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { UserResource } from '@/modules/user/domain/enums/user.enum';

import type { IUserIdListCursor } from '@/modules/user/domain/types/userIdListCursor.type';

interface IProps {
    limit: number;
    cursor: IUserIdListCursor | null;
}

@Cacheable<FindUserIdListQuery>({
    namespace: UserResource.USER,
})
export class FindUserIdListQuery {
    constructor(public readonly props: IProps) {}
}
