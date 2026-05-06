import { HttpException, HttpStatus } from '@nestjs/common';

import { INTERNAL_SERVER_ERROR_MESSAGE } from '@/common/constants/messages.constant';
import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';

import type { IAppExceptionStrategy } from './exceptionStrategy.interface';
import type { IHttpExceptionResponse } from '@/common/infrastructure/core/exceptions/app/httpExceptionResponse.interface';

export class HttpStrategy implements IAppExceptionStrategy<HttpException> {
    constructor(private readonly exception: unknown) {}

    canHandle(): boolean {
        return this.exception instanceof HttpException;
    }

    getException(): HttpException {
        return this.exception as HttpException;
    }

    getData(): unknown {
        const exception = this.getException();
        const response = exception.getResponse();
        if (this.isResponseObject(response)) {
            return (response as IHttpExceptionResponse).data || null;
        }
        return null;
    }

    getMessage(): string {
        const exception = this.getException();
        const response = exception.getResponse();
        let message = INTERNAL_SERVER_ERROR_MESSAGE;
        if (this.isResponseString(response)) {
            message = response || message;
        } else if (this.isResponseObject(response)) {
            message = (response as IHttpExceptionResponse<string>).message || message;
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

    private isResponseString(response: string | object) {
        return typeof response === 'string';
    }

    private isResponseObject(response: string | object) {
        return typeof response === 'object';
    }
}
