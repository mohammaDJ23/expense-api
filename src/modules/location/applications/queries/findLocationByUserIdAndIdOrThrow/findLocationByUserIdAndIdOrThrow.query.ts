import { Cacheable } from '@/core/features/queryCache/cacheable.decorator';
import { LocationResource } from '@/modules/location/domain/enums/location.enum';

interface IProps {
    userId: string;
    id: string;
}

@Cacheable<FindLocationByUserIdAndIdOrThrowQuery>({
    namespace: LocationResource.LOCATION,
    scope(query) {
        return query.props.userId;
    },
})
export class FindLocationByUserIdAndIdOrThrowQuery {
    constructor(public readonly props: IProps) {}
}
