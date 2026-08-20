import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { ReceiverResource } from '@/modules/receiver/receiver.enum';

interface IProps {
    userId: string;
    ids: string[];
}

@Cacheable<FindManyReceiversByUserIdAndIdsQuery>({
    namespace: ReceiverResource.RECEIVER,
    scope(query) {
        return query.props.userId;
    },
})
export class FindManyReceiversByUserIdAndIdsQuery {
    constructor(public readonly props: IProps) {}
}
