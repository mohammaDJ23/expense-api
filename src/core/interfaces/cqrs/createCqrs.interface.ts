interface ICreateEntity {
    id?: string;
    createdAt?: string;
}

export type TCreate<T extends ICreateEntity> = Omit<T, 'id'> & Required<Pick<T, 'createdAt'>>;
