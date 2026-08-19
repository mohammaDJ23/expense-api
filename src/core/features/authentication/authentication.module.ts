import { Module } from '@nestjs/common';

import { AccessTokenService } from '@/core/features/accessToken/accessToken.service';
import { QueryDispatcherModule } from '@/core/features/queryDispatcher/queryDispatcher.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { JwtModule } from '@/infrastructure/jwt/jwt.module';
import { UserModule } from '@/modules/user/user.module';

import { GoogleAuthGuard } from './googleAuth.guard';
import { GoogleAuthStrategy } from './googleAuth.strategy';
import { JwtAuthGuard } from './jwtAuth.guard';
import { JwtAuthStrategy } from './jwtAuth.strategy';

@Module({
    imports: [CqrsModule, JwtModule, QueryDispatcherModule, UserModule],
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
