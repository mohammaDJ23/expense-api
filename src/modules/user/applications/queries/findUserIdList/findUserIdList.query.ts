import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { UserResource } from '@/modules/user/user.enum';

interface IProps {
    limit: number;
    cursor: string | null;
}

@Cacheable<FindUserIdListQuery>({
    namespace: UserResource.USER,
})
export class FindUserIdListQuery {
    constructor(public readonly props: IProps) {}
}
