import { Injectable } from '@nestjs/common';
import { desc, eq, isNull } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import { toEntities } from '@/infrastructure/database/drizzle/transformers/toEntities.transformer';
import { toEntityOrNull } from '@/infrastructure/database/drizzle/transformers/toEntityOrNull.transformer';
import { toEntityOrThrow } from '@/infrastructure/database/drizzle/transformers/toEntityOrThrow.transformer';
import { toIsExistsByCount } from '@/infrastructure/database/drizzle/transformers/toIsExistsByCount.transformer';
import {
    users,
    type IInsertUser,
    type ISelectUser,
} from '@/modules/user/infrastructure/schemas/user.schema';

import type { IList } from '@/core/interfaces/list.interface';
import type { IUserRepository } from '@/modules/user/domain/interfaces/userRepository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(private readonly drizzleRepository: DrizzleRepository) {}

    create(data: IInsertUser): Promise<ISelectUser> {
        return toEntityOrThrow(
            this.drizzleRepository.db.insert(users).values(data).returning().execute(),
            'Unable to create',
        );
    }

    update(data: Partial<ISelectUser> & Required<Pick<ISelectUser, 'id'>>): Promise<ISelectUser> {
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

    findList(options: IList): Promise<ISelectUser[]> {
        return toEntities(
            this.drizzleRepository.db
                .select()
                .from(users)
                .orderBy(desc(users.createdAt))
                .limit(options.limit)
                .offset(options.offset)
                .execute(),
        );
    }

    existsById(id: string): Promise<boolean> {
        return toIsExistsByCount(this.drizzleRepository.db.$count(users, eq(users.id, id)));
    }

    existsByEmail(email: string): Promise<boolean> {
        return toIsExistsByCount(this.drizzleRepository.db.$count(users, eq(users.email, email)));
    }
}
