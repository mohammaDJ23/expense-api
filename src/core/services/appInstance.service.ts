import { Injectable, InternalServerErrorException, type INestApplication } from '@nestjs/common';

@Injectable()
export class AppInstanceService {
    private app: INestApplication | null = null;

    set(app: INestApplication): void {
        this.app = app;
    }

    get(): INestApplication {
        if (!this.app) {
            throw new InternalServerErrorException(
                'App instance not set. Call setApp() during bootstrap.',
            );
        }
        return this.app;
    }
}
