import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { ConsumerResource } from '@/modules/consumer/consumer.enum';

import type { ICursor } from '@/core/utils/pagination/cursor.type';

interface IProps {
    userId: string;
    cursor: ICursor | null;
    limit: number;
}

@Cacheable<FindConsumerListByUserIdQuery>({
    namespace: ConsumerResource.CONSUMER,
    scope(query) {
        return query.props.userId;
    },
})
export class FindConsumerListByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
