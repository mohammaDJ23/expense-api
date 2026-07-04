import { Module } from '@nestjs/common';

import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { JwtModule } from '@/infrastructure/jwt/jwt.module';

import { AccessTokenService } from './accessToken.service';
import { GoogleAuthGuard } from './googleAuth.guard';
import { GoogleAuthStrategy } from './googleAuth.strategy';
import { JwtAuthGuard } from './jwtAuth.guard';
import { JwtAuthStrategy } from './jwtAuth.strategy';

@Module({
    imports: [CqrsModule, JwtModule],
    providers: [
        GoogleAuthGuard,
        GoogleAuthStrategy,
        JwtAuthGuard,
        JwtAuthStrategy,
        AccessTokenService,
    ],
    exports: [JwtAuthGuard, GoogleAuthGuard, AccessTokenService],
})
export class AuthenticationModule {}
