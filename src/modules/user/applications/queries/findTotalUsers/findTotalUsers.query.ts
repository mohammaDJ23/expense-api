import { Cacheable } from '@/core/features/queryCache/cacheable.decorator';
import { UserResource } from '@/modules/user/domain/enums/user.enum';

@Cacheable<FindTotalUsersQuery>({
    namespace: UserResource.USER,
})
export class FindTotalUsersQuery {
    constructor() {}
}
