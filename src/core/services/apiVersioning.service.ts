import { Injectable, VersioningType } from '@nestjs/common';

import { AppInstanceService } from '@/core/services/appInstance.service';

@Injectable()
export class ApiVersioningService {
    constructor(private readonly appInstanceService: AppInstanceService) {}

    set(): void {
        const app = this.appInstanceService.get();

        app.enableVersioning({
            type: VersioningType.URI,
            prefix: 'v',
        });
    }
}
