import { INTERNAL_SERVER_ERROR } from '@/common/constants/exception.constants';

import { ErrorStrategy } from './error.strategy';
import { FallbackStrategy } from './fallback.strategy';
import { ObjectWithMessageStrategy } from './objectWithMessage.strategy';
import { StringStrategy } from './string.strategy';

import type { IErrorStrategy } from './errorStrategy.interface';

export class AppException extends Error {
    constructor(error: unknown) {
        const strategies: IErrorStrategy[] = [
            new ErrorStrategy(),
            new StringStrategy(),
            new ObjectWithMessageStrategy(),
            new FallbackStrategy(),
        ];

        const strategy = strategies.find((strategy) => strategy.canHandle(error));

        if (strategy) {
            const message = strategy.getMessage(error);
            super(message);
        } else {
            super(INTERNAL_SERVER_ERROR);
        }
    }
}
