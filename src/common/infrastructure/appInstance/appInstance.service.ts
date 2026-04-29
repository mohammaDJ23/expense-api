import { Injectable, type INestApplication } from '@nestjs/common';

import { AppException } from '@/common/kernel/exceptions/app/exception';

import type { IAppInstance } from './appInstance.interface';

@Injectable()
export class AppInstanceService implements IAppInstance {
    private app: INestApplication | null = null;

    setApp(app: INestApplication): void {
        this.app = app;
    }

    getApp(): INestApplication {
        if (!this.app) {
            throw new AppException('App instance not set. Call setApp() during bootstrap.');
        }
        return this.app;
    }
}
