export function groupBy<T, K extends PropertyKey>(
    items: T[],
    getKey: (item: T) => K,
): Record<K, T[]> {
    const map = new Map<K, T[]>();

    for (const item of items) {
        const key = getKey(item);

        const group = map.get(key);

        if (group) {
            group.push(item);
        } else {
            map.set(key, [item]);
        }
    }

    return Object.fromEntries(map) as Record<K, T[]>;
}
