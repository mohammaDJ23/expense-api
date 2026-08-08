import { Module } from '@nestjs/common';

import { OwnerGuard } from './owner.guard';

@Module({
    providers: [OwnerGuard],
})
export class AuthorizationModule {}
