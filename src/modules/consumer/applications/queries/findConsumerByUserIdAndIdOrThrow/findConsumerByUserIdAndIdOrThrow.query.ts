import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { ConsumerResource } from '@/modules/consumer/consumer.enum';

interface IProps {
    userId: string;
    id: string;
}

@Cacheable<FindConsumerByUserIdAndIdOrThrowQuery>({
    namespace: ConsumerResource.CONSUMER,
    scope(query) {
        return query.props.userId;
    },
})
export class FindConsumerByUserIdAndIdOrThrowQuery {
    constructor(public readonly props: IProps) {}
}
