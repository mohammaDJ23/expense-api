import { Injectable, OnModuleInit } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule as NestSwaggerModule } from '@nestjs/swagger';

import { AppInstanceService } from '@/core/services/appInstance.service';
import { VersionService } from '@/core/services/version.service';

import { DESCRIPTION, JSON_PATH, PATH, TITLE, VERSION } from './swagger.constants';

@Injectable()
export class SwaggerService implements OnModuleInit {
    constructor(
        private readonly appInstanceService: AppInstanceService,
        private readonly versionService: VersionService,
    ) {}

    onModuleInit(): void {
        this.setupSwagger();
    }

    private setupSwagger(): void {
        const version = this.versionService.getVersion() || VERSION;

        const configBuilder = new DocumentBuilder()
            .setTitle(TITLE)
            .setDescription(DESCRIPTION)
            .setVersion(version);

        const config = configBuilder.build();
        const app = this.appInstanceService.get();
        const document = NestSwaggerModule.createDocument(app, config);

        NestSwaggerModule.setup(PATH, app, document, {
            jsonDocumentUrl: JSON_PATH,
            useGlobalPrefix: false,
        });
    }
}
