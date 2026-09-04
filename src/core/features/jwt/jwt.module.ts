import { Module } from '@nestjs/common';

import { AccessTokenModule } from '@/core/features/accessToken/accessToken.module';
import { QueryDispatcherModule } from '@/core/features/queryDispatcher/queryDispatcher.module';

import { JwtAuthGuard } from './jwtAuth.guard';
import { JwtAuthStrategy } from './jwtAuth.strategy';

@Module({
    imports: [AccessTokenModule, QueryDispatcherModule],
    providers: [JwtAuthStrategy, JwtAuthGuard],
    exports: [JwtAuthGuard],
})
export class JWTModule {}
