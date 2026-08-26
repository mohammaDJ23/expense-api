import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntityOrNull } from '@/infrastructure/database/drizzle/transformers/toEntityOrNull.transformer';
import { toEntityOrThrow } from '@/infrastructure/database/drizzle/transformers/toEntityOrThrow.transformer';
import {
    oauthAccounts,
    type IInsertOauthAccount,
    type ISelectOauthAccount,
} from '@/modules/authentication/infrastructure/schemas/oauthAccount.schema';

import type { OauthProvider } from '@/modules/authentication/domain/enums/oauthProvider.enum';
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

    findByProviderAndProviderIdOrNull(
        provider: OauthProvider,
        providerId: string,
    ): Promise<ISelectOauthAccount | null> {
        return toEntityOrNull(
            this.drizzleRepository.db
                .select()
                .from(oauthAccounts)
                .where(
                    and(
                        eq(oauthAccounts.provider, provider),
                        eq(oauthAccounts.providerId, providerId),
                    ),
                )
                .execute(),
        );
    }
}
