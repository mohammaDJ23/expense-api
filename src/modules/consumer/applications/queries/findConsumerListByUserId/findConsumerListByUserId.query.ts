import { Cacheable } from '@/core/features/queryCache/cacheable.decorator';
import { ConsumerResource } from '@/modules/consumer/domain/enums/consumer.enum';

import type { IConsumerListCursor } from '@/modules/consumer/domain/types/consumerListCursor.type';

interface IProps {
    userId: string;
    cursor: IConsumerListCursor | null;
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
