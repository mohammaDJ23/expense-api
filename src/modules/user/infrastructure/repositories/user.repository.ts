import { Injectable } from '@nestjs/common';
import { and, asc, desc, eq, gt, isNull, lt, or } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toCount } from '@/infrastructure/database/drizzle/transformers/toCount.transformer';
import { toEntities } from '@/infrastructure/database/drizzle/transformers/toEntities.transformer';
import { toEntityOrNull } from '@/infrastructure/database/drizzle/transformers/toEntityOrNull.transformer';
import { toEntityOrThrow } from '@/infrastructure/database/drizzle/transformers/toEntityOrThrow.transformer';
import { toExistsByCount } from '@/infrastructure/database/drizzle/transformers/toExistsByCount.transformer';
import {
    users,
    type IInsertUser,
    type ISelectUser,
} from '@/modules/user/infrastructure/schemas/user.schema';

import type { IId } from '@/core/types/id.type';
import type { ICursor } from '@/core/utils/pagination/cursor.type';
import type { IUserRepository } from '@/modules/user/domain/interfaces/userRepository.interface';
import type { TUpdateUser } from '@/modules/user/domain/types/updateUser.type';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(private readonly drizzleRepository: DrizzleRepository) {}

    create(data: IInsertUser): Promise<ISelectUser> {
        return toEntityOrThrow(
            this.drizzleRepository.db.insert(users).values(data).returning().execute(),
            'Unable to create',
        );
    }

    update(data: TUpdateUser): Promise<ISelectUser> {
        return toEntityOrThrow(
            this.drizzleRepository.db
                .update(users)
                .set(data)
                .where(eq(users.id, data.id))
                .returning()
                .execute(),
            'Unable to update',
        );
    }

    deleteById(id: string): Promise<ISelectUser> {
        return toEntityOrThrow(
            this.drizzleRepository.db.delete(users).where(eq(users.id, id)).returning().execute(),
            'Unable to delete',
        );
    }

    deleteManyNotVerified(): Promise<ISelectUser[]> {
        return toEntities(
            this.drizzleRepository.db
                .delete(users)
                .where(isNull(users.verifiedAt))
                .returning()
                .execute(),
        );
    }

    findByEmailOrNull(email: string): Promise<ISelectUser | null> {
        return toEntityOrNull(
            this.drizzleRepository.db.select().from(users).where(eq(users.email, email)).execute(),
        );
    }

    findByIdOrNull(id: string): Promise<ISelectUser | null> {
        return toEntityOrNull(
            this.drizzleRepository.db.select().from(users).where(eq(users.id, id)).execute(),
        );
    }

    findByIdOrThrow(id: string): Promise<ISelectUser> {
        return toEntityOrThrow(
            this.drizzleRepository.db.select().from(users).where(eq(users.id, id)).execute(),
            'Unable to find',
        );
    }

    findList(limit: number, cursor: ICursor | null): Promise<ISelectUser[]> {
        return toEntities(
            this.drizzleRepository.db
                .select()
                .from(users)
                .where(
                    cursor
                        ? or(
                              lt(users.createdAt, cursor.createdAt),
                              and(eq(users.createdAt, cursor.createdAt), lt(users.id, cursor.id)),
                          )
                        : undefined,
                )
                .orderBy(desc(users.createdAt), desc(users.id))
                .limit(limit + 1)
                .execute(),
        );
    }

    existsById(id: string): Promise<boolean> {
        return toExistsByCount(this.drizzleRepository.db.$count(users, eq(users.id, id)));
    }

    existsByEmail(email: string): Promise<boolean> {
        return toExistsByCount(this.drizzleRepository.db.$count(users, eq(users.email, email)));
    }

    findTotal(): Promise<number> {
        return toCount(this.drizzleRepository.db.$count(users));
    }

    findIdList(limit: number, cursor: string | null): Promise<IId[]> {
        return toEntities(
            this.drizzleRepository.db
                .select({ id: users.id })
                .from(users)
                .where(cursor ? gt(users.id, cursor) : undefined)
                .orderBy(asc(users.id))
                .limit(limit + 1)
                .execute(),
        );
    }
}
