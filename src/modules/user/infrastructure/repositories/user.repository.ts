import { Injectable } from '@nestjs/common';
import { eq, isNull, sql } from 'drizzle-orm';

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
        return toEntityOrThrow(this.db.insert(users).values(data).returning(), 'Unable to create');
    }

    update(data: Partial<TSelectUser> & Required<Pick<TSelectUser, 'id'>>): Promise<TSelectUser> {
        return toEntityOrThrow(
            this.db.update(users).set(data).where(eq(users.id, data.id)).returning(),
            'Unable to update',
        );
    }

    deleteManyNotVerified(): Promise<TSelectUser[]> {
        return toEntities(this.db.delete(users).where(isNull(users.verifiedAt)).returning());
    }

    isExistsByEmail(email: string): Promise<boolean> {
        return isExists(this.db.select().from(users).where(eq(users.email, email)));
    }

    getByEmailOrNull(email: string): Promise<TSelectUser | null> {
        return toEntityOrNull(this.db.select().from(users).where(eq(users.email, email)));
    }

    getByIdOrNull(id: string): Promise<TSelectUser | null> {
        return toEntityOrNull(this.db.select().from(users).where(eq(users.id, id)));
    }

    getByIdOrThrow(id: string): Promise<TSelectUser> {
        return toEntityOrThrow(
            this.db
                .select()
                .from(users)
                .where(eq(users.id, sql.placeholder('id')))
                .prepare('get_user_by_id_or_throw')
                .execute({ id }),
            'Unable to find',
        );
    }
}
