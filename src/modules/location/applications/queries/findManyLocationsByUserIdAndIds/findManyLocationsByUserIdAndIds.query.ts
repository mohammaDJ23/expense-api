import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { LocationResource } from '@/modules/location/location.enum';

interface IProps {
    userId: string;
    ids: string[];
}

@Cacheable<FindManyLocationsByUserIdAndIdsQuery>({
    namespace: LocationResource.LOCATION,
    scope(query) {
        return query.props.userId;
    },
})
export class FindManyLocationsByUserIdAndIdsQuery {
    constructor(public readonly props: IProps) {}
}
