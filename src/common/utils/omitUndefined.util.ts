export function omitUndefined<T extends object>(source: T): T {
    return Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(source).filter(([_, value]) => value !== undefined),
    ) as T;
}
