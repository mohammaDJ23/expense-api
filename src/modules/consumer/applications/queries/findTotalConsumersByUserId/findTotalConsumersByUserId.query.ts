import { Cacheable } from '@/core/features/queryCache/cacheable.decorator';
import { ConsumerResource } from '@/modules/consumer/domain/enums/consumer.enum';

interface IProps {
    userId: string;
}

@Cacheable<FindTotalConsumersByUserIdQuery>({
    namespace: ConsumerResource.CONSUMER,
    scope(query) {
        return query.props.userId;
    },
})
export class FindTotalConsumersByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
