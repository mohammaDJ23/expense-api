import { NotFoundException } from '@nestjs/common';

export async function toEntityOrThrow<T>(query: Promise<T[]>, errorMessage: string): Promise<T> {
    const result = await query;
    if (!result[0]) {
        throw new NotFoundException(errorMessage);
    }
    return result[0];
}
