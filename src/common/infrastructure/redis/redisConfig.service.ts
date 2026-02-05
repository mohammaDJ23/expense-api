import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { RedisModuleOptions, RedisOptionsFactory } from '@liaoliaots/nestjs-redis';

import { REDIS_DB, REDIS_PORT } from 'src/common/constants';
import { readSecret } from 'src/common/utils/readSecret.util';

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
                password: readSecret(this.configService.get<string>('REDIS_PASSWORD_FILE', '')),
                db: parseInt(this.configService.get<string>('REDIS_DB', REDIS_DB.toString()), 10),
            },
        };
    }
}
