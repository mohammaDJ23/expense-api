import { Injectable, type INestApplication } from '@nestjs/common';

import { AppException } from '@/core/exceptions/app/exception';

@Injectable()
export class AppInstanceService {
    private app: INestApplication | null = null;

    set(app: INestApplication): void {
        this.app = app;
    }

    get(): INestApplication {
        if (!this.app) {
            throw new AppException('App instance not set. Call setApp() during bootstrap.');
        }
        return this.app;
    }
}
