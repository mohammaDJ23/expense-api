export function omitUndefined<T extends object>(source: T): T {
    return Object.fromEntries(
        Object.entries(source).filter(([_, value]) => value !== undefined),
    ) as T;
}
