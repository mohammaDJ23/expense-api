import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { LocationResource } from '@/modules/location/location.enum';

import type { ICursor } from '@/core/utils/pagination/cursor.type';

interface IProps {
    userId: string;
    cursor: ICursor | null;
    limit: number;
}

@Cacheable<FindLocationListByUserIdQuery>({
    namespace: LocationResource.LOCATION,
    scope(query) {
        return query.props.userId;
    },
})
export class FindLocationListByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
