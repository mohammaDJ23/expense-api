import { Injectable } from '@nestjs/common';
import { eq, isNull } from 'drizzle-orm';

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

    deleteAllNotVerified(): Promise<TSelectUser[]> {
        return toEntities(this.db.delete(users).where(isNull(users.verifiedAt)).returning());
    }

    private selectByEmail(email: string) {
        return this.db.select().from(users).where(eq(users.email, email));
    }

    isExistsByEmail(email: string): Promise<boolean> {
        return isExists(this.selectByEmail(email));
    }

    getByEmailOrThrow(email: string): Promise<TSelectUser> {
        return toEntityOrThrow(this.selectByEmail(email), 'User not found');
    }

    getByEmailOrNull(email: string): Promise<TSelectUser | null> {
        return toEntityOrNull(this.selectByEmail(email));
    }

    private selectById(id: string) {
        return this.db.select().from(users).where(eq(users.id, id));
    }

    isExistsById(id: string): Promise<boolean> {
        return isExists(this.selectById(id));
    }

    getByIdOrThrow(id: string): Promise<TSelectUser> {
        return toEntityOrThrow(this.selectById(id), 'User not found');
    }

    getByIdOrNull(id: string): Promise<TSelectUser | null> {
        return toEntityOrNull(this.selectById(id));
    }
}
