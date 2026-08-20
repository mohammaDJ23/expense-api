import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { UserResource } from '@/modules/user/user.enum';

interface IProps {
    email: string;
}

@Cacheable<FindUserByEmailOrNullQuery>({
    namespace: UserResource.USER,
})
export class FindUserByEmailOrNullQuery {
    constructor(public readonly props: IProps) {}
}
