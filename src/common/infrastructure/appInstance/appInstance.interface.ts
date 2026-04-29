import type { INestApplication } from '@nestjs/common';

export interface IAppInstance {
    setApp: (app: INestApplication) => void;
    getApp: () => INestApplication;
}
