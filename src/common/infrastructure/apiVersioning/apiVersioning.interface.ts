import type { INestApplication } from '@nestjs/common';

export interface IApiVersioning {
    set: (app: INestApplication) => void;
}
