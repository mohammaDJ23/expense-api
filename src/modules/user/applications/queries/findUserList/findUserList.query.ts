import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { UserResource } from '@/modules/user/user.enum';

import type { ICursor } from '@/core/utils/pagination/cursor.type';

interface IProps {
    cursor: ICursor | null;
    limit: number;
}

@Cacheable<FindUserListQuery>({
    namespace: UserResource.USER,
})
export class FindUserListQuery {
    constructor(public readonly props: IProps) {}
}
