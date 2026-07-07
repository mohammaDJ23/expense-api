import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@elastic/elasticsearch';

import { ELASTICSEARCH_PROVIDER } from './elasticsearch.constants';

@Module({
    providers: [
        {
            provide: ELASTICSEARCH_PROVIDER,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return new Client({
                    node: configService.getOrThrow<string>('ELASTICSEARCH_URL'),
                    auth: {
                        username: configService.getOrThrow<string>('ELASTICSEARCH_USERNAME'),
                        password: configService.getOrThrow<string>('ELASTICSEARCH_PASSWORD'),
                    },
                    requestTimeout: 30_000,
                    maxRetries: 3,
                    tls:
                        configService.getOrThrow<string>('ELASTICSEARCH_TLS') === 'true'
                            ? { rejectUnauthorized: false }
                            : undefined,
                });
            },
        },
    ],
    exports: [ELASTICSEARCH_PROVIDER],
})
export class ElasticsearchModule {}
