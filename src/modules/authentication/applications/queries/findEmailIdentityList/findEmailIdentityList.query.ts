import type { IEmailIdentityListCursor } from '@/modules/authentication/domain/types/emailIdentityListCursor.type';

interface IProps {
    limit: number;
    cursor: IEmailIdentityListCursor | null;
}

export class FindEmailIdentityListQuery {
    constructor(public readonly props: IProps) {}
}
