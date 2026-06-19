import { NotFoundException } from '@nestjs/common';

export async function toEntityOrNull<T>(query: Promise<T[]>): Promise<T | null> {
    const result = await query;
    return result[0] ?? null;
}

export async function toEntityOrThrow<T>(query: Promise<T[]>, errorMessage: string): Promise<T> {
    const result = await query;
    if (!result[0]) {
        throw new NotFoundException(errorMessage);
    }
    return result[0];
}

export function toEntities<T>(query: Promise<T[]>): Promise<T[]> {
    return query;
}

export async function toEntitiesOrThrow<T>(
    query: Promise<T[]>,
    errorMessage: string,
): Promise<T[]> {
    const result = await query;
    if (result.length <= 0) {
        throw new NotFoundException(errorMessage);
    }
    return result;
}

export async function isExists<T>(query: Promise<T[]>): Promise<boolean> {
    const result = await query;
    return result.length > 0;
}

export async function toCount<T>(query: Promise<T[]>): Promise<number> {
    const result = await query;
    return result.length;
}
