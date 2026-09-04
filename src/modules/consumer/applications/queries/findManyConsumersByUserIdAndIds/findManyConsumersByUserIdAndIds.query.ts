import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { ConsumerResource } from '@/modules/consumer/domain/enums/consumer.enum';

interface IProps {
    userId: string;
    ids: string[];
}

@Cacheable<FindManyConsumersByUserIdAndIdsQuery>({
    namespace: ConsumerResource.CONSUMER,
    scope(query) {
        return query.props.userId;
    },
})
export class FindManyConsumersByUserIdAndIdsQuery {
    constructor(public readonly props: IProps) {}
}
