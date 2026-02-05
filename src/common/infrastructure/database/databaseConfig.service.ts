import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { DATABASE_NAME, DATABASE_PORT } from 'src/common/constants';
import { isDevelopment } from 'src/common/utils/environments.util';
import { readSecret } from 'src/common/utils/readSecret.util';

import { CustomNamingStrategy } from './naming.strategy';

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: DATABASE_NAME,
            host: this.configService.get<string>('DATABASE_HOST'),
            port: parseInt(
                this.configService.get<string>('DATABASE_PORT', DATABASE_PORT.toString()),
                10,
            ),
            username: this.configService.get<string>('DATABASE_USER'),
            password: readSecret(this.configService.get<string>('DATABASE_PASSWORD_FILE', '')),
            database: this.configService.get<string>('DATABASE_NAME'),
            namingStrategy: new CustomNamingStrategy(),
            entities: [],
            synchronize: isDevelopment(),
        };
    }
}
