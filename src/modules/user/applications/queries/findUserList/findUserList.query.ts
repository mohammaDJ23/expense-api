interface IProps {
    offset: number;
    limit: number;
}

export class FindUserListQuery {
    public readonly props: IProps;

    constructor(props: Partial<IProps> = {}) {
        this.props = {
            offset: props.offset || 0,
            limit: props.limit || 10,
        };
    }
}
