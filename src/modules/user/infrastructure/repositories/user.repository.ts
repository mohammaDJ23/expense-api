import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import {
    isExists,
    toEntityOrNull,
    toEntityOrThrow,
} from '@/infrastructure/database/drizzle/drizzle.transformer';
import { DrizzleClientService } from '@/infrastructure/database/drizzle/drizzleClient.service';
import {
    users,
    type TInsertUser,
    type TSelectUser,
} from '@/modules/user/infrastructure/schemas/user.schema';

import type { UserEntity } from '@/modules/user/domain/entities/user.entity';
import type { IUserRepository } from '@/modules/user/domain/interfaces/userRepository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(private readonly drizzleClientService: DrizzleClientService) {}

    create(data: Omit<UserEntity, 'id'>): Promise<TInsertUser> {
        return toEntityOrThrow(
            this.drizzleClientService.db.insert(users).values(data).returning(),
            'Unable to create',
        );
    }

    update(id: string, data: Partial<TSelectUser>): Promise<TSelectUser> {
        return toEntityOrThrow(
            this.drizzleClientService.db
                .update(users)
                .set(data)
                .where(eq(users.id, id))
                .returning(),
            'Unable to update',
        );
    }

    private selectByEmail(email: string) {
        return this.drizzleClientService.db.select().from(users).where(eq(users.email, email));
    }

    isExistsByEmail(email: string): Promise<boolean> {
        return isExists(this.selectByEmail(email));
    }

    getByEmailOrThrow(email: string): Promise<TSelectUser> {
        return toEntityOrThrow(this.selectByEmail(email), 'User not found');
    }

    getByEmail(email: string): Promise<TSelectUser | null> {
        return toEntityOrNull(this.selectByEmail(email));
    }

    private selectById(id: string) {
        return this.drizzleClientService.db.select().from(users).where(eq(users.id, id));
    }

    isExistsById(id: string): Promise<boolean> {
        return isExists(this.selectById(id));
    }

    getByIdOrThrow(id: string): Promise<TSelectUser> {
        return toEntityOrThrow(this.selectById(id), 'User not found');
    }

    getById(id: string): Promise<TSelectUser | null> {
        return toEntityOrNull(this.selectById(id));
    }
}
