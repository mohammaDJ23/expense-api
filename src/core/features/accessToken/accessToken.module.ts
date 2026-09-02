import { Module } from '@nestjs/common';

import { JwtModule } from '@/infrastructure/jwt/jwt.module';

import { AccessTokenService } from './accessToken.service';

@Module({
    imports: [JwtModule],
    providers: [AccessTokenService],
    exports: [AccessTokenService],
})
export class AccessTokenModule {}
