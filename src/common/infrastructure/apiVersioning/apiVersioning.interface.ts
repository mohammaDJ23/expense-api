import type { INestApplication } from '@nestjs/common';

export interface IApiVersioning {
    setApiVersioning: (app: INestApplication) => void;
}
