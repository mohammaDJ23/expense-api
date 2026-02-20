import { Injectable, OnApplicationBootstrap, INestApplication, Inject } from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule as NestSwaggerModule } from '@nestjs/swagger';

import { VERSION_PROVIDER } from '../version/version.constants';

import { DESCRIPTION, JSON_PATH, PATH, TITLE, VERSION } from './swagger.constants';

import type { IVersionProvider } from '../version/version.interface';

interface IHttpAdapterHost extends HttpAdapterHost<
    AbstractHttpAdapter<unknown, unknown, unknown>
> {}

@Injectable()
export class SwaggerService implements OnApplicationBootstrap {
    constructor(
        private readonly httpAdapterHost: IHttpAdapterHost,
        @Inject(VERSION_PROVIDER) private readonly versionProvider: IVersionProvider,
    ) {}

    onApplicationBootstrap(): void {
        this.setupSwagger();
    }

    private setupSwagger(): void {
        const httpAdapter = this.httpAdapterHost.httpAdapter;

        const app = httpAdapter.getInstance<INestApplication>();

        const version = this.versionProvider.getVersion() || VERSION;

        const configBuilder = new DocumentBuilder()
            .setTitle(TITLE)
            .setDescription(DESCRIPTION)
            .addBearerAuth()
            .setVersion(version);

        const config = configBuilder.build();
        const document = NestSwaggerModule.createDocument(app, config);

        NestSwaggerModule.setup(PATH, app, document, {
            jsonDocumentUrl: JSON_PATH,
        });
    }
}
