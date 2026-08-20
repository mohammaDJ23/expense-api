import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { UserResource } from '@/modules/user/user.enum';

interface IProps {
    id: string;
}

@Cacheable<FindUserByIdOrThrowQuery>({
    namespace: UserResource.USER,
})
export class FindUserByIdOrThrowQuery {
    constructor(public readonly props: IProps) {}
}
