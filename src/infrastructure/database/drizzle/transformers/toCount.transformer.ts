import { InternalServerErrorException } from '@nestjs/common';

export async function toCount(query: Promise<number>): Promise<number> {
    const count = await query;
    if (typeof count !== 'number') {
        throw new InternalServerErrorException('Query result is not a number');
    }
    return count;
}
