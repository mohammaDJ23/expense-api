import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { LocationResource } from '@/modules/location/domain/enums/location.enum';

interface IProps {
    userId: string;
}

@Cacheable<FindTotalLocationsByUserIdQuery>({
    namespace: LocationResource.LOCATION,
    scope(query) {
        return query.props.userId;
    },
})
export class FindTotalLocationsByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
