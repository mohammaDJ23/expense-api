import { Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';

import { isExists, toEntity } from '@/infrastructure/database/drizzle/drizzle.transformer';
import { DrizzleClientService } from '@/infrastructure/database/drizzle/drizzleClient.service';
import { users } from '@/modules/user/infrastructure/entities/user.orm.entity';

import type { UserEntity } from '@/modules/user/domain/entities/user.entity';
import type { IUserRepository } from '@/modules/user/domain/interfaces/userRepository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(private readonly drizzleClientService: DrizzleClientService) {}

    create(data: UserEntity): Promise<UserEntity> {
        return toEntity(this.drizzleClientService.db.insert(users).values(data).returning());
    }

    isExistsByEmail(email: string): Promise<boolean> {
        return isExists(
            this.drizzleClientService.db
                .select({ one: sql<number>`1` })
                .from(users)
                .where(eq(users.email, email))
                .limit(1),
        );
    }
}
