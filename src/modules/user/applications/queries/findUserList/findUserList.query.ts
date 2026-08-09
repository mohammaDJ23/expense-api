import type { ICursor } from '@/core/utils/cursor/cursor.type';

interface IProps {
    cursor: ICursor | null;
    limit: number;
}

export class FindUserListQuery {
    constructor(public readonly props: IProps) {}
}
