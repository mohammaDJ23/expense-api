import { createHash } from 'node:crypto';

import { Injectable } from '@nestjs/common';

import type { TQuery } from './query.type';
import type { IService } from '@/core/interfaces/service.interface';

@Injectable()
export class CacheQueryHasherService implements IService<TQuery, string> {
    execute(input: TQuery): string {
        const payload = {
            queryName: input.constructor.name,
            ...input,
        };
        return createHash('sha256').update(JSON.stringify(payload)).digest('hex');
    }
}
