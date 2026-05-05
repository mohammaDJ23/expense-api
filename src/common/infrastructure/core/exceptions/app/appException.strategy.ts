import { HttpStatus } from '@nestjs/common';

import { INTERNAL_SERVER_ERROR_MESSAGE } from '@/common/constants/messages.constant';
import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';

import { AppException } from './exception';

import type { IAppException } from '@/common/kernel/interfaces/appException.interface';
import type { IAppExceptionStrategy } from '@/common/kernel/interfaces/appExceptionStrategy.interface';

export class AppExceptionStrategy implements IAppExceptionStrategy<IAppException> {
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
