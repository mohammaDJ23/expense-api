import type { ICursor } from '@/core/utils/pagination/cursor.type';

interface IProps {
    userId: string;
    limit: number;
    cursor: ICursor | null;
}

export class FindBillListByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
