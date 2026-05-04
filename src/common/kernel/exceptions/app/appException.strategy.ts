import { HttpStatus } from '@nestjs/common';

import { INTERNAL_SERVER_ERROR_MESSAGE } from '@/common/constants/messages.constant';
import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';

import { AppException } from './exception';

import type { IAppException } from './exception.interface';
import type { IExceptionStrategy } from './strategy.interface';

export class AppExceptionStrategy implements IExceptionStrategy<IAppException> {
    constructor(private readonly exception: unknown) {}

    canHandle(): boolean {
        return this.exception instanceof AppException;
    }

    getException(): AppException {
        return this.exception as AppException;
    }

    getMessage(): string {
        const exception = this.getException();
        return exception.message || INTERNAL_SERVER_ERROR_MESSAGE;
    }

    getStatusCode(): number {
        const exception = this.getException();
        return exception.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    }

    getTimestamp(): string {
        const exception = this.getException();
        return exception.timestamp || getCurrentUTCTimestamp();
    }
}
