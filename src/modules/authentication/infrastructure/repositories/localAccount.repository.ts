import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntityOrNull } from '@/infrastructure/database/drizzle/transformers/toEntityOrNull.transformer';
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

    findByEmailIdOrNull(emailId: string): Promise<ISelectLocalAccount | null> {
        return toEntityOrNull(
            this.drizzleRepository.db
                .select()
                .from(localAccounts)
                .where(eq(localAccounts.emailId, emailId))
                .execute(),
        );
    }
}
