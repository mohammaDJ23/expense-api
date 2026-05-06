import type { INestApplication } from '@nestjs/common';

export interface IAppInstance {
    set(app: INestApplication): void;
    get(): INestApplication;
}
