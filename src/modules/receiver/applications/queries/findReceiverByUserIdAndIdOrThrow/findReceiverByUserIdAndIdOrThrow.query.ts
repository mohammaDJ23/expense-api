import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { ReceiverResource } from '@/modules/receiver/domain/enums/receiver.enum';

interface IProps {
    userId: string;
    id: string;
}

@Cacheable<FindReceiverByUserIdAndIdOrThrowQuery>({
    namespace: ReceiverResource.RECEIVER,
    scope(query) {
        return query.props.userId;
    },
})
export class FindReceiverByUserIdAndIdOrThrowQuery {
    constructor(public readonly props: IProps) {}
}
