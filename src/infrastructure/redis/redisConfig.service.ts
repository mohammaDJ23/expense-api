import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { readSecret } from '@/core/utils/readSecret.util';

import type { RedisModuleOptions, RedisOptionsFactory } from '@liaoliaots/nestjs-redis';

@Injectable()
export class RedisConfigService implements RedisOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createRedisOptions(): RedisModuleOptions {
        return {
            config: {
                host: this.configService.getOrThrow<string>('REDIS_HOST'),
                port: parseInt(this.configService.getOrThrow<string>('REDIS_PORT'), 10),
                username: this.configService.getOrThrow<string>('REDIS_USERNAME'),
                password: readSecret(this.configService.getOrThrow<string>('REDIS_PASSWORD_FILE')),
                db: parseInt(this.configService.getOrThrow<string>('REDIS_DB'), 10),
            },
        };
    }
}
