import { Injectable } from '@nestjs/common';
import { and, desc, eq, lt, or } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntities } from '@/infrastructure/database/drizzle/transformers/toEntities.transformer';
import { toEntityOrNull } from '@/infrastructure/database/drizzle/transformers/toEntityOrNull.transformer';
import { toEntityOrThrow } from '@/infrastructure/database/drizzle/transformers/toEntityOrThrow.transformer';
import { toExistsByCount } from '@/infrastructure/database/drizzle/transformers/toExistsByCount.transformer';
import {
    emailIdentities,
    type IInsertEmailIdentity,
    type ISelectEmailIdentity,
} from '@/modules/authentication/infrastructure/schemas/emailIdentity.schema';

import type { IEmailIdentityRepository } from '@/modules/authentication/domain/interfaces/emailIdentityRepository.interface';
import type { IEmailIdentityListCursor } from '@/modules/authentication/domain/types/emailIdentityListCursor.type';

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

    findByEmailOrThrow(email: string): Promise<ISelectEmailIdentity> {
        return toEntityOrThrow(
            this.drizzleRepository.db
                .select()
                .from(emailIdentities)
                .where(eq(emailIdentities.email, email))
                .execute(),
            'Unable to find',
        );
    }

    findByUserIdOrThrow(userId: string): Promise<ISelectEmailIdentity> {
        return toEntityOrThrow(
            this.drizzleRepository.db
                .select()
                .from(emailIdentities)
                .where(eq(emailIdentities.userId, userId))
                .execute(),
            'Unable to find',
        );
    }

    findList(
        limit: number,
        cursor: IEmailIdentityListCursor | null,
    ): Promise<ISelectEmailIdentity[]> {
        return toEntities(
            this.drizzleRepository.db
                .select()
                .from(emailIdentities)
                .where(
                    cursor
                        ? or(
                              lt(emailIdentities.createdAt, cursor.createdAt),
                              and(
                                  eq(emailIdentities.createdAt, cursor.createdAt),
                                  lt(emailIdentities.id, cursor.id),
                              ),
                          )
                        : undefined,
                )
                .orderBy(desc(emailIdentities.createdAt), desc(emailIdentities.id))
                .limit(limit + 1)
                .execute(),
        );
    }

    existsByEmail(email: string): Promise<boolean> {
        return toExistsByCount(
            this.drizzleRepository.db.$count(emailIdentities, eq(emailIdentities.email, email)),
        );
    }
}
