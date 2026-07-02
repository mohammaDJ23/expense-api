interface IDeleteEntity {
    id?: string;
}

export type TDelete<T extends IDeleteEntity> = Pick<T, 'id'>;
