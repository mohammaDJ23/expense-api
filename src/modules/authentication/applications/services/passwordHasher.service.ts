import { Injectable } from '@nestjs/common';
import { hash, argon2id, verify } from 'argon2';

import {
    ARGON2_HASH_LENGTH,
    ARGON2_MEMORY_COST,
    ARGON2_PARALLELISM,
    ARGON2_TIME_COST,
} from './services.constant';

@Injectable()
export class PasswordHasherService {
    hash(password: string): Promise<string> {
        return hash(password, {
            type: argon2id,
            memoryCost: ARGON2_MEMORY_COST,
            timeCost: ARGON2_TIME_COST,
            parallelism: ARGON2_PARALLELISM,
            hashLength: ARGON2_HASH_LENGTH,
        });
    }

    verify(hashedPassword: string, plainPassword: string): Promise<boolean> {
        return verify(hashedPassword, plainPassword);
    }
}
