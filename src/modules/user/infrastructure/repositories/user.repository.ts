import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { isExists, toEntityOrThrow } from '@/infrastructure/database/drizzle/drizzle.transformer';
import { DrizzleClientService } from '@/infrastructure/database/drizzle/drizzleClient.service';
import { users } from '@/modules/user/infrastructure/schemas/user.schema';

import type { UserEntity } from '@/modules/user/domain/entities/user.entity';
import type { IUserRepository } from '@/modules/user/domain/interfaces/userRepository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(private readonly drizzleClientService: DrizzleClientService) {}

    create(data: UserEntity): Promise<UserEntity> {
        return toEntityOrThrow(
            this.drizzleClientService.db.insert(users).values(data).returning(),
            'Failed to create a new user',
        );
    }

    isExistsByEmail(email: string): Promise<boolean> {
        return isExists(
            this.drizzleClientService.db.select().from(users).where(eq(users.email, email)),
        );
    }
}
