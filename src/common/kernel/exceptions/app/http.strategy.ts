import { HttpException, HttpStatus } from '@nestjs/common';

import { INTERNAL_SERVER_ERROR_MESSAGE } from '@/common/constants/messages.constant';
import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';

import type { IExceptionStrategy } from './strategy.interface';

export class HttpStrategy implements IExceptionStrategy<HttpException> {
    constructor(private readonly exception: unknown) {}

    canHandle(): boolean {
        return this.exception instanceof HttpException;
    }

    getException(): HttpException {
        return this.exception as HttpException;
    }

    getMessage(): string {
        const exception = this.getException();
        const response = exception.getResponse();
        const isResponseString = typeof response === 'string';
        const isResponseObject = typeof response === 'object';
        let message = INTERNAL_SERVER_ERROR_MESSAGE;
        if (isResponseString) {
            message = response || message;
        } else if (isResponseObject) {
            message = (response as Record<string, string>).message || message;
        }
        return message;
    }

    getStatusCode(): number {
        const exception = this.getException();
        const statusCode = exception.getStatus();
        return statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    }

    getTimestamp(): string {
        return getCurrentUTCTimestamp();
    }
}
