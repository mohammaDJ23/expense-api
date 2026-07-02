interface IProps {
    userId: string;
    offset: number;
    limit: number;
}

export class FindReceiverListByUserIdQuery {
    public readonly props: IProps;

    constructor(props: Required<Pick<IProps, 'userId'>> & Partial<IProps>) {
        this.props = {
            userId: props.userId,
            offset: props.offset || 0,
            limit: props.limit || 10,
        };
    }
}
