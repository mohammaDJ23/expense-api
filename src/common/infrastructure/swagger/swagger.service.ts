import { Injectable, OnApplicationBootstrap, INestApplication } from '@nestjs/common';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule as NestSwaggerModule } from '@nestjs/swagger';

import * as packageJson from '../../../../package.json';

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

        const apiVersion = packageJson.version || '1.0.0';

        const configBuilder = new DocumentBuilder()
            .setTitle('The expense-api documentation')
            .setDescription(
                `
                    The Expense API provides endpoints for:
                    • Creating and managing expense reports
                    • Uploading and attaching receipt images
                    • Submitting expenses for approval
                    • Tracking reimbursement status
                    • Generating expense analytics and reports
                `,
            )
            .addBearerAuth()
            .setVersion(apiVersion);

        const config = configBuilder.build();
        const document = NestSwaggerModule.createDocument(app, config);

        const path = 'api';
        NestSwaggerModule.setup(path, app, document);
    }
}
