import { Module } from '@nestjs/common';

import { AccessTokenModule } from '@/core/features/accessToken/accessToken.module';
import { QueryDispatcherModule } from '@/core/features/queryDispatcher/queryDispatcher.module';
import { CqrsModule } from '@/infrastructure/cqrs/cqrs.module';

@Module({
    imports: [AccessTokenModule, CqrsModule, QueryDispatcherModule],
})
export class JWTModule {}
