import { isNotEmpty } from './isNotEmpty.util';

export function whenNotEmpty<T, R>(arr: T[], callback: (arr: T[]) => Promise<R[]>): Promise<R[]> {
    if (isNotEmpty(arr)) {
        return callback(arr);
    }
    return Promise.resolve([]);
}
