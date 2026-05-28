import { Module } from '@nestjs/common';

import { DrizzleModule } from '@/infrastructure/database/drizzle/drizzle.module';

@Module({
    imports: [DrizzleModule],
})
export class DatabaseModule {}
