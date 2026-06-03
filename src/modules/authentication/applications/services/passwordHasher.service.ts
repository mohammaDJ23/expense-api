import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { hash, argon2id, verify } from 'argon2';

import {
    ARGON2_HASH_LENGTH,
    ARGON2_MEMORY_COST,
    ARGON2_PARALLELISM,
    ARGON2_TIME_COST,
} from '@/modules/authentication/applications/services/constants/passwordHasher.constant';

@Injectable()
export class PasswordHasherService {
    async hash(password: string): Promise<string> {
        try {
            return await hash(password, {
                type: argon2id,
                memoryCost: ARGON2_MEMORY_COST,
                timeCost: ARGON2_TIME_COST,
                parallelism: ARGON2_PARALLELISM,
                hashLength: ARGON2_HASH_LENGTH,
            });
        } catch {
            throw new InternalServerErrorException('The password hashing is failed');
        }
    }

    async verify(hashedPassword: string, plainPassword: string): Promise<boolean> {
        try {
            return await verify(hashedPassword, plainPassword);
        } catch {
            throw new InternalServerErrorException('The password verifying is failed');
        }
    }
}
