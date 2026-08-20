import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { UserResource } from '@/modules/user/user.enum';

@Cacheable<FindTotalUsersQuery>({
    namespace: UserResource.USER,
})
export class FindTotalUsersQuery {
    constructor() {}
}
