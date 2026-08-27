import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntityOrNull } from '@/infrastructure/database/drizzle/transformers/toEntityOrNull.transformer';
import { toEntityOrThrow } from '@/infrastructure/database/drizzle/transformers/toEntityOrThrow.transformer';
import { toExistsByCount } from '@/infrastructure/database/drizzle/transformers/toExistsByCount.transformer';
import {
    emailIdentities,
    type IInsertEmailIdentity,
    type ISelectEmailIdentity,
} from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';

import type { IEmailIdentityRepository } from '@/modules/authentication/domain/interfaces/emailIdentityRepository.interface';

@Injectable()
export class EmailIdentityRepository implements IEmailIdentityRepository {
    constructor(private readonly drizzleRepository: DrizzleRepository) {}

    create(data: IInsertEmailIdentity): Promise<ISelectEmailIdentity> {
        return toEntityOrThrow(
            this.drizzleRepository.db.insert(emailIdentities).values(data).returning().execute(),
            'Unable to create',
        );
    }

    findByEmailOrNull(email: string): Promise<ISelectEmailIdentity | null> {
        return toEntityOrNull(
            this.drizzleRepository.db
                .select()
                .from(emailIdentities)
                .where(eq(emailIdentities.email, email))
                .execute(),
        );
    }

    existsByEmail(email: string): Promise<boolean> {
        return toExistsByCount(
            this.drizzleRepository.db.$count(emailIdentities, eq(emailIdentities.email, email)),
        );
    }
}
