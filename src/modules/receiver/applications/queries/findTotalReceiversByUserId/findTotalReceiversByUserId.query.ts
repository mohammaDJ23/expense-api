import { Cacheable } from '@/core/features/queryCache/cacheable.decorator';
import { ReceiverResource } from '@/modules/receiver/domain/enums/receiver.enum';

interface IProps {
    userId: string;
}

@Cacheable<FindTotalReceiversByUserIdQuery>({
    namespace: ReceiverResource.RECEIVER,
    scope(query) {
        return query.props.userId;
    },
})
export class FindTotalReceiversByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
