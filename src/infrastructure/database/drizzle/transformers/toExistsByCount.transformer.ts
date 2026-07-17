import { InternalServerErrorException } from '@nestjs/common';

export async function toExistsByCount(query: Promise<number>, expectCount = 1): Promise<boolean> {
    const count = await query;
    if (typeof count !== 'number') {
        throw new InternalServerErrorException('Query result is not a number');
    }
    return count === expectCount;
}
