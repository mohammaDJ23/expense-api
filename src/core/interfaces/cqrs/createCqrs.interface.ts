interface ICreateEntity {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
}

export type TCreate<T extends ICreateEntity> = Omit<T, 'id'> &
    Required<Pick<T, 'createdAt' | 'updatedAt'>>;
