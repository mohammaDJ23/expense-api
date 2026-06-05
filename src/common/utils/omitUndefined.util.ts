export function omitUndefined<T extends Record<string, unknown>>(source: T): Partial<T> {
    return Object.fromEntries(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        Object.entries(source).filter(([_, value]) => value !== undefined),
    ) as Partial<T>;
}
