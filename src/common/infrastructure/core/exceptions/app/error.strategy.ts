import { HttpStatus } from '@nestjs/common';

import { INTERNAL_SERVER_ERROR_MESSAGE } from '@/common/constants/messages.constant';
import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';

import type { IAppExceptionStrategy } from './exceptionStrategy.interface';

export class ErrorStrategy implements IAppExceptionStrategy<Error> {
    constructor(private readonly exception: unknown) {}

    canHandle(): boolean {
        return this.exception instanceof Error;
    }

    getException(): Error {
        return this.exception as Error;
    }

    getData(): unknown {
        return null;
    }

    getMessage(): string {
        const exception = this.getException();
        return exception.message || INTERNAL_SERVER_ERROR_MESSAGE;
    }

    getStatusCode(): number {
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }

    getTimestamp(): string {
        return getCurrentUTCTimestamp();
    }
}
