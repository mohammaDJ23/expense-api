import { InternalServerErrorException, NotFoundException } from '@nestjs/common';

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

export async function toIsExistsByCount(query: Promise<number>, expectCount = 1): Promise<boolean> {
    const count = await query;
    if (typeof count !== 'number') {
        throw new InternalServerErrorException('Query result is not a number');
    }
    return count === expectCount;
}
