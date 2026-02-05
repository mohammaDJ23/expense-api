import { Module } from '@nestjs/common';

import { RedisModule as RM } from '@liaoliaots/nestjs-redis';

import { RedisConfigService } from './redisConfig.service';

@Module({
    imports: [
        RM.forRootAsync({
            useClass: RedisConfigService,
        }),
    ],
})
export class RedisModule {}
