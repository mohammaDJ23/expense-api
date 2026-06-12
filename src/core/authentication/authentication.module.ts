import { Module } from '@nestjs/common';

import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';
import { UserModule } from '@/modules/user/user.module';

import { GoogleAuthGuard } from './googleAuth.guard';
import { GoogleAuthStrategy } from './googleAuth.strategy';
import { JwtAuthGuard } from './jwtAuth.guard';
import { JwtAuthStrategy } from './jwtAuth.strategy';

@Module({
    imports: [UserModule, CqrsModule],
    providers: [GoogleAuthGuard, GoogleAuthStrategy, JwtAuthGuard, JwtAuthStrategy],
    exports: [JwtAuthGuard, GoogleAuthGuard],
})
export class AuthenticationModule {}
