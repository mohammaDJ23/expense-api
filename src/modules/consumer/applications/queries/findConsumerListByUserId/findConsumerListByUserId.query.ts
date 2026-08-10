import type { ICursor } from '@/core/utils/pagination/cursor.type';

interface IProps {
    userId: string;
    cursor: ICursor | null;
    limit: number;
}

export class FindConsumerListByUserIdQuery {
    constructor(public readonly props: IProps) {}
}
