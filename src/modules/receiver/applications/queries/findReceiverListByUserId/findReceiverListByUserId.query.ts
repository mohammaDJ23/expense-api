import { Cacheable } from '@/core/features/cache/cacheable.decorator';
import { ReceiverResource } from '@/modules/receiver/domain/enums/receiver.enum';

import type { IReceiverListCursor } from '@/modules/receiver/domain/types/receiverListCursor.type';

interface IProps {
    userId: string;
    cursor: IReceiverListCursor | null;
    limit: number;
}

@Cacheable<FindReceiverListByUserIdQuery>({
    namespace: ReceiverResource.RECEIVER,
    scope(query) {
        return query.props.userId;
    },
})
export class FindReceiverListByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
