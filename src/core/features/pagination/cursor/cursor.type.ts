interface ICursorBase {
    id: string;
}

export type TCursor<T extends object = object> = ICursorBase & T;
