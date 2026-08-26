import { Injectable } from '@nestjs/common';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntityOrThrow } from '@/infrastructure/database/drizzle/transformers/toEntityOrThrow.transformer';
import {
    oauthAccounts,
    type IInsertOauthAccount,
    type ISelectOauthAccount,
} from '@/modules/authentication/infrastructure/schemas/oauthAccount.schema';

import type { IOauthAccountRepository } from '@/modules/authentication/domain/interfaces/oauthAccountRepository.interface';

@Injectable()
export class OauthAccountRepository implements IOauthAccountRepository {
    constructor(private readonly drizzleRepository: DrizzleRepository) {}

    create(data: IInsertOauthAccount): Promise<ISelectOauthAccount> {
        return toEntityOrThrow(
            this.drizzleRepository.db.insert(oauthAccounts).values(data).returning().execute(),
            'Unable to create',
        );
    }
}
