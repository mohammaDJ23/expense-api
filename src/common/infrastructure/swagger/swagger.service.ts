import { Injectable, type OnApplicationBootstrap, Inject } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule as NestSwaggerModule } from '@nestjs/swagger';

import { AppInstanceService } from '@/common/infrastructure/appInstance/appInstance.service';
import { VERSION_PROVIDER } from '@/common/infrastructure/version/version.constants';

import { DESCRIPTION, JSON_PATH, PATH, TITLE, VERSION } from './swagger.constants';

import type { IVersionProvider } from '@/common/infrastructure/version/version.interface';

@Injectable()
export class SwaggerService implements OnApplicationBootstrap {
    constructor(
        private readonly appInstanceService: AppInstanceService,
        @Inject(VERSION_PROVIDER) private readonly versionProvider: IVersionProvider,
    ) {}

    onApplicationBootstrap(): void {
        this.setupSwagger();
    }

    private setupSwagger(): void {
        const version = this.versionProvider.getVersion() || VERSION;

        const configBuilder = new DocumentBuilder()
            .setTitle(TITLE)
            .setDescription(DESCRIPTION)
            .addBearerAuth()
            .setVersion(version);

        const config = configBuilder.build();
        const app = this.appInstanceService.get();
        const document = NestSwaggerModule.createDocument(app, config);

        NestSwaggerModule.setup(PATH, app, document, {
            jsonDocumentUrl: JSON_PATH,
        });
    }
}
