import type { ConfigService } from '@nestjs/config';

export function getNodeEnv(configService: ConfigService): string {
    return configService.getOrThrow<string>('NODE_ENV');
}

export function isDevelopment(configService: ConfigService): boolean {
    return getNodeEnv(configService) === 'development';
}

export function isProduction(configService: ConfigService): boolean {
    return getNodeEnv(configService) === 'production';
}
