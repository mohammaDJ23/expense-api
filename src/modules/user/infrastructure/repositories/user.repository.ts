import { Injectable } from '@nestjs/common';
import { desc, eq, isNull, sql } from 'drizzle-orm';

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
export class UserRepository extends DrizzleRepository implements IUserRepository {
    create(data: TInsertUser): Promise<TSelectUser> {
        return toEntityOrThrow(
            this.db.insert(users).values(data).returning().prepare('create_user').execute(),
            'Unable to create',
        );
    }

    update(data: Partial<TSelectUser> & Required<Pick<TSelectUser, 'id'>>): Promise<TSelectUser> {
        return toEntityOrThrow(
            this.db
                .update(users)
                .set(data)
                .where(eq(users.id, sql.placeholder('id')))
                .returning()
                .prepare('update_user')
                .execute({ id: data.id }),
            'Unable to update',
        );
    }

    deleteManyNotVerified(): Promise<TSelectUser[]> {
        return toEntities(
            this.db
                .delete(users)
                .where(isNull(users.verifiedAt))
                .returning()
                .prepare('delete_many_users_not_verified')
                .execute(),
        );
    }

    private getByEmail(email: string) {
        return this.db
            .select()
            .from(users)
            .where(eq(users.email, sql.placeholder('email')))
            .prepare('get_user_by_email')
            .execute({ email });
    }

    isExistsByEmail(email: string): Promise<boolean> {
        return isExists(this.getByEmail(email));
    }

    getByEmailOrNull(email: string): Promise<TSelectUser | null> {
        return toEntityOrNull(this.getByEmail(email));
    }

    private getById(id: string) {
        return this.db
            .select()
            .from(users)
            .where(eq(users.id, sql.placeholder('id')))
            .prepare('get_user_by_id')
            .execute({ id });
    }

    getByIdOrNull(id: string): Promise<TSelectUser | null> {
        return toEntityOrNull(this.getById(id));
    }

    getByIdOrThrow(id: string): Promise<TSelectUser> {
        return toEntityOrThrow(this.getById(id), 'Unable to find');
    }

    getMany(offset: number, limit: number): Promise<TSelectUser[]> {
        return toEntities(
            this.db
                .select()
                .from(users)
                .orderBy(desc(users.createdAt))
                .limit(sql.placeholder('limit'))
                .offset(sql.placeholder('offset'))
                .prepare('get_many_users')
                .execute({ offset, limit }),
        );
    }
}
