import pLimit from 'p-limit';

export function concurrency<T = unknown>(callback: () => Promise<T>, concurrency = 2): Promise<T> {
    const fn = pLimit(concurrency);
    return fn(callback);
}
