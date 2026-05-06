import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import '@/common/infrastructure/database/typeorm/queryBuilder.extension';

import { DatabaseConfigService } from './databaseConfig.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useClass: DatabaseConfigService,
        }),
    ],
})
export class DatabaseModule {}
