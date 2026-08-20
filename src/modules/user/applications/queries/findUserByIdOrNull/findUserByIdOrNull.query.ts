import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { UserResource } from '@/modules/user/user.enum';

interface IProps {
    id: string;
}

@Cacheable<FindUserByIdOrNullQuery>({
    namespace: UserResource.USER,
})
export class FindUserByIdOrNullQuery {
    constructor(public readonly props: IProps) {}
}
