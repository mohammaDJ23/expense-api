import { Injectable, VersioningType } from '@nestjs/common';

import { AppInstanceService } from '@/infrastructure/appInstance/appInstance.service';

import type { IApiVersioning } from './apiVersioning.interface';

@Injectable()
export class ApiVersioningService implements IApiVersioning {
    constructor(private readonly appInstanceService: AppInstanceService) {}

    set(): void {
        const app = this.appInstanceService.get();

        app.enableVersioning({
            type: VersioningType.URI,
            prefix: 'v',
        });
    }
}
