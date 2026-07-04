import { Injectable } from '@nestjs/common';
import cookieParser from 'cookie-parser';

import { AppInstanceService } from '@/core/services/appInstance.service';

@Injectable()
export class CookieParserService {
    constructor(private readonly appInstanceService: AppInstanceService) {}

    set(): void {
        const app = this.appInstanceService.get();

        app.use(cookieParser());
    }
}
