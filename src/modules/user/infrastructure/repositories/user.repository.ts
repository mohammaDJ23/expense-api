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

    deleteManyNotVerified(): Promise<ISelectUser[]> {
        return toEntities(
            this.drizzleRepository.db
                .delete(users)
                .where(isNull(users.verifiedAt))
                .returning()
                .execute(),
        );
    }

    private findByEmail(email: string): Promise<ISelectUser[]> {
        return this.drizzleRepository.db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .execute();
    }

    isExistsByEmail(email: string): Promise<boolean> {
        return isExists(this.findByEmail(email));
    }

    findByEmailOrNull(email: string): Promise<ISelectUser | null> {
        return toEntityOrNull(this.findByEmail(email));
    }

    private findById(id: string): Promise<ISelectUser[]> {
        return this.drizzleRepository.db.select().from(users).where(eq(users.id, id)).execute();
    }

    findByIdOrNull(id: string): Promise<ISelectUser | null> {
        return toEntityOrNull(this.findById(id));
    }

    findByIdOrThrow(id: string): Promise<ISelectUser> {
        return toEntityOrThrow(this.findById(id), 'Unable to find');
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
}
