import type { ICursor } from '@/core/utils/pagination/cursor.type';

interface IProps {
    cursor: ICursor | null;
    limit: number;
}

export class FindUserListQuery {
    constructor(public readonly props: IProps) {}
}
