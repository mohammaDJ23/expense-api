import { Injectable, VersioningType } from '@nestjs/common';

import { AppInstanceService } from '@/common/infrastructure/appInstance/appInstance.service';

import type { IApiVersioning } from './apiVersioning.interface';

@Injectable()
export class ApiVersioningService implements IApiVersioning {
    constructor(private readonly appInstanceService: AppInstanceService) {}

    setApiVersioning(): void {
        const app = this.appInstanceService.getApp();

        app.enableVersioning({
            type: VersioningType.URI,
            prefix: 'v',
        });
    }
}
