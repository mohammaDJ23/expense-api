import { Injectable, OnApplicationBootstrap, INestApplication } from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule as NestSwaggerModule } from '@nestjs/swagger';

import * as packageJson from '../../../../package.json';

import { DESCRIPTION, JSON_PATH, PATH, TITLE, VERSION } from './swagger.constants';

interface IHttpAdapterHost extends HttpAdapterHost<
    AbstractHttpAdapter<unknown, unknown, unknown>
> {}

@Injectable()
export class SwaggerService implements OnApplicationBootstrap {
    constructor(private readonly httpAdapterHost: IHttpAdapterHost) {}

    onApplicationBootstrap(): void {
        this.setupSwagger();
    }

    private setupSwagger(): void {
        const httpAdapter = this.httpAdapterHost.httpAdapter;

        const app = httpAdapter.getInstance<INestApplication>();

        const apiVersion = packageJson.version || VERSION;

        const configBuilder = new DocumentBuilder()
            .setTitle(TITLE)
            .setDescription(DESCRIPTION)
            .addBearerAuth()
            .setVersion(apiVersion);

        const config = configBuilder.build();
        const document = NestSwaggerModule.createDocument(app, config);

        NestSwaggerModule.setup(PATH, app, document, {
            jsonDocumentUrl: JSON_PATH,
        });
    }
}
