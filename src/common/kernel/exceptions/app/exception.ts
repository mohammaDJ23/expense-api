import { HttpStatus } from '@nestjs/common';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';

import { AppExceptionStrategy } from './appException.strategy';
import { ErrorStrategy } from './error.strategy';
import { INTERNAL_SERVER_ERROR } from './exception.constants';
import { FallbackStrategy } from './fallback.strategy';
import { HttpStrategy } from './http.strategy';
import { ObjectStrategy } from './object.strategy';
import { StringStrategy } from './string.strategy';

import type { IAppException } from './exception.interface';
import type { IExceptionStrategy } from './strategy.interface';

export class AppException extends Error implements IAppException {
    public readonly statusCode: number;
    public readonly timestamp: string;
    public readonly message: string;

    constructor(exception: unknown) {
        super();

        const strategies: IExceptionStrategy[] = [
            new AppExceptionStrategy(exception),
            new HttpStrategy(exception),
            new ErrorStrategy(exception),
            new StringStrategy(exception),
            new ObjectStrategy(exception),
            new FallbackStrategy(),
        ];

        const strategy = strategies.find((strategy) => strategy.canHandle());

        if (strategy) {
            this.statusCode = strategy.getStatusCode();
            this.timestamp = strategy.getTimestamp();
            this.message = strategy.getMessage();
        } else {
            this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
            this.timestamp = getCurrentUTCTimestamp();
            this.message = INTERNAL_SERVER_ERROR;
        }
    }
}
