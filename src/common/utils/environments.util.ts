import type { ConfigService } from '@nestjs/config';

export function isDevelopment(configService: ConfigService): boolean {
    return configService.get<string>('NODE_ENV') === 'development';
}

export function isProduction(configService: ConfigService): boolean {
    return configService.get<string>('NODE_ENV') === 'production';
}
