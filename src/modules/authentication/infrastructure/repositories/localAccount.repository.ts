import { Injectable } from '@nestjs/common';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntityOrThrow } from '@/infrastructure/database/drizzle/transformers/toEntityOrThrow.transformer';
import {
    localAccounts,
    type IInsertLocalAccount,
    type ISelectLocalAccount,
} from '@/modules/authentication/infrastructure/schemas/localAccount.schema';

import type { ILocalAccountRepository } from '@/modules/authentication/domain/interfaces/localAccountRepository.interface';

@Injectable()
export class LocalAccountRepository implements ILocalAccountRepository {
    constructor(private readonly drizzleRepository: DrizzleRepository) {}

    create(data: IInsertLocalAccount): Promise<ISelectLocalAccount> {
        return toEntityOrThrow(
            this.drizzleRepository.db.insert(localAccounts).values(data).returning().execute(),
            'Unable to create',
        );
    }
}
