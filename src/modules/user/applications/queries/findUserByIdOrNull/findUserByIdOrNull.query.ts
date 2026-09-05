import { Cacheable } from '@/core/features/queryCache/cacheable.decorator';
import { UserResource } from '@/modules/user/domain/enums/user.enum';

interface IProps {
    id: string;
}

@Cacheable<FindUserByIdOrNullQuery>({
    namespace: UserResource.USER,
})
export class FindUserByIdOrNullQuery {
    constructor(public readonly props: IProps) {}
}
