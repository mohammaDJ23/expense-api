import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { readSecret } from '@/common/utils/readSecret.util';

import { REDIS_DB, REDIS_PORT, REDIS_USERNAME } from './redis.constants';

import type { RedisModuleOptions, RedisOptionsFactory } from '@liaoliaots/nestjs-redis';

@Injectable()
export class RedisConfigService implements RedisOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createRedisOptions(): RedisModuleOptions {
        return {
            config: {
                host: this.configService.get<string>('REDIS_HOST'),
                port: parseInt(
                    this.configService.get<string>('REDIS_PORT', REDIS_PORT.toString()),
                    10,
                ),
                username: this.configService.get<string>('REDIS_USERNAME', REDIS_USERNAME),
                password: readSecret(this.configService.get<string>('REDIS_PASSWORD_FILE', '')),
                db: parseInt(this.configService.get<string>('REDIS_DB', REDIS_DB.toString()), 10),
            },
        };
    }
}
