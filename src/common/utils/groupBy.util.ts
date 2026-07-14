export function groupBy<T, K extends PropertyKey>(
    items: T[],
    getKey: (item: T) => K,
): Record<K, T[]> {
    return items.reduce(
        (acc, val) => {
            const key = getKey(val);

            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, sonarjs/no-nested-assignment, security/detect-object-injection
            (acc[key] ??= []).push(val);

            return acc;
        },
        {} as Record<K, T[]>,
    );
}
