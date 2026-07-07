import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from '@elastic/elasticsearch';

import { readSecret } from '@/common/utils/readSecret.util';

import { ELASTICSEARCH_PROVIDER } from './elasticsearch.constants';
import { ElasticSearchService } from './elasticsearch.service';

@Module({
    providers: [
        ElasticSearchService,
        {
            provide: ELASTICSEARCH_PROVIDER,
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return new Client({
                    node: configService.getOrThrow<string>('ELASTICSEARCH_URL'),
                    auth: {
                        username: configService.getOrThrow<string>('ELASTICSEARCH_USERNAME'),
                        password: readSecret(
                            configService.getOrThrow<string>('ELASTICSEARCH_PASSWORD_FILE'),
                        ),
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
    exports: [ElasticSearchService],
})
export class ElasticsearchModule {}
