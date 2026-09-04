import type { ConfigService } from '@nestjs/config';

export function getNodeEnv(configService: ConfigService): string {
    return configService.getOrThrow<string>('NODE_ENV');
}
