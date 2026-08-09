import type { ICursor } from '@/core/utils/cursor/cursor.type';

interface IProps {
    userId: string;
    limit: number;
    cursor: ICursor | null;
}

export class FindBillListByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
