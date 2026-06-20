import { Injectable } from '@nestjs/common';
import { desc, eq, isNull } from 'drizzle-orm';

import { DrizzleRepository } from '@/infrastructure/database/drizzle/drizzle.repository';
import {
    isExists,
    toEntities,
    toEntityOrNull,
    toEntityOrThrow,
} from '@/infrastructure/database/drizzle/drizzle.transformer';
import {
    users,
    type TInsertUser,
    type TSelectUser,
} from '@/modules/user/infrastructure/schemas/user.schema';

import type { IUserRepository } from '@/modules/user/domain/interfaces/userRepository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(private readonly drizzleRepository: DrizzleRepository) {}

    create(data: TInsertUser): Promise<TSelectUser> {
        return toEntityOrThrow(
            this.drizzleRepository.db.insert(users).values(data).returning().execute(),
            'Unable to create',
        );
    }

    update(data: Partial<TSelectUser> & Required<Pick<TSelectUser, 'id'>>): Promise<TSelectUser> {
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

    deleteManyNotVerified(): Promise<TSelectUser[]> {
        return toEntities(
            this.drizzleRepository.db
                .delete(users)
                .where(isNull(users.verifiedAt))
                .returning()
                .execute(),
        );
    }

    private getByEmail(email: string) {
        return this.drizzleRepository.db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .execute();
    }

    isExistsByEmail(email: string): Promise<boolean> {
        return isExists(this.getByEmail(email));
    }

    getByEmailOrNull(email: string): Promise<TSelectUser | null> {
        return toEntityOrNull(this.getByEmail(email));
    }

    private getById(id: string) {
        return this.drizzleRepository.db.select().from(users).where(eq(users.id, id)).execute();
    }

    getByIdOrNull(id: string): Promise<TSelectUser | null> {
        return toEntityOrNull(this.getById(id));
    }

    getByIdOrThrow(id: string): Promise<TSelectUser> {
        return toEntityOrThrow(this.getById(id), 'Unable to find');
    }

    getMany(offset: number, limit: number): Promise<TSelectUser[]> {
        return toEntities(
            this.drizzleRepository.db
                .select()
                .from(users)
                .orderBy(desc(users.createdAt))
                .limit(limit)
                .offset(offset)
                .execute(),
        );
    }
}
