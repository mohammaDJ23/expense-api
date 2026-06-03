import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule as BaseJwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { readSecret } from '@/common/utils/readSecret.util';

@Global()
@Module({
    imports: [
        PassportModule,
        BaseJwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    secret: readSecret(configService.getOrThrow('JWT_SECRET_FILE')),
                    signOptions: { expiresIn: '1d' },
                };
            },
        }),
    ],
    exports: [BaseJwtModule],
})
export class JwtModule {}
