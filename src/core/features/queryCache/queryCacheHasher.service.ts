import { createHash } from 'node:crypto';

import { Injectable } from '@nestjs/common';

import type { IService } from '@/core/interfaces/service.interface';
import type { TQuery } from '@/infrastructure/cqrs/query.type';

@Injectable()
export class QueryCacheHasherService implements IService<TQuery, string> {
    execute(input: TQuery): string {
        const payload = {
            queryName: input.constructor.name,
            ...input,
        };
        return createHash('sha256').update(JSON.stringify(payload)).digest('hex');
    }
}
