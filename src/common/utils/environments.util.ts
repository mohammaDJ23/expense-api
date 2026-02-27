import { AppException } from '@/common/kernel/exceptions/app/app.exception';

import type { ConfigService } from '@nestjs/config';

export function getNodeEnv(configService: ConfigService): string {
    const nodeEnv = configService.get<string>('NODE_ENV');

    if (!nodeEnv) {
        throw new AppException('No NODE_ENV provided');
    }

    return nodeEnv;
}

export function isDevelopment(configService: ConfigService): boolean {
    return getNodeEnv(configService) === 'development';
}

export function isProduction(configService: ConfigService): boolean {
    return getNodeEnv(configService) === 'production';
}
