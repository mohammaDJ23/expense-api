import { Cacheable } from '@/core/features/queryCache/cacheable.decorator';
import { BillResource } from '@/modules/bill/domain/enums/bill.enum';

import type { IBillListCursor } from '@/modules/bill/domain/types/billListCursor.type';

interface IProps {
    userId: string;
    limit: number;
    cursor: IBillListCursor | null;
}

@Cacheable<FindBillListByUserIdQuery>({
    namespace: BillResource.BILL,
    scope(query) {
        return query.props.userId;
    },
})
export class FindBillListByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
