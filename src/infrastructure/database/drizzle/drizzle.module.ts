import { Global, Module } from '@nestjs/common';

import { DrizzleClientService } from '@/infrastructure/database/drizzle/drizzleClient.service';
import { DrizzleConnectionService } from '@/infrastructure/database/drizzle/drizzleConnection.service';

@Global()
@Module({
    providers: [DrizzleConnectionService, DrizzleClientService],
    exports: [DrizzleClientService],
})
export class DrizzleModule {}
