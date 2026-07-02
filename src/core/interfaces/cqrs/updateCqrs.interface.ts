interface IUpdateEntity {
    id?: string;
    updatedAt?: string;
}

export type TUpdate<T extends IUpdateEntity> = Pick<T, 'id' | 'updatedAt'> &
    Partial<Omit<T, 'id' | 'updatedAt'>>;
