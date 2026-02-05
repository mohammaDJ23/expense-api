import { Module } from '@nestjs/common';
import { ConfigModule as CM } from '@nestjs/config';

import { isDevelopment, isProduction } from 'src/common/utils/environments.util';

function getEnvFilePath(): string {
    let envFilePath = '';

    if (isDevelopment()) {
        envFilePath = '.env';
    } else if (isProduction()) {
        envFilePath = '.env.production';
    }

    return envFilePath;
}

@Module({
    imports: [CM.forRoot({ envFilePath: getEnvFilePath(), isGlobal: true })],
})
export class ConfigModule {}
