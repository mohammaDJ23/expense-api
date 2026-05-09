import { HttpStatus } from '@nestjs/common';

import { INTERNAL_SERVER_ERROR_MESSAGE } from '@/common/constants/messages.constant';
import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';

import type { IAppExceptionStrategy } from './exceptionStrategy.interface';
import type { IObjectException } from './objectException.interface';

export class ObjectStrategy implements IAppExceptionStrategy<IObjectException> {
    constructor(private readonly exception: unknown) {}

    canHandle(): boolean {
        return (
            this.exception !== undefined &&
            this.exception !== null &&
            !Array.isArray(this.exception) &&
            typeof this.exception !== 'function' &&
            typeof this.exception === 'object'
        );
    }

    getException(): IObjectException {
        return this.exception as IObjectException;
    }

    getMessage(): string {
        const exception = this.getException();
        return (exception.message ||
            exception.errorText ||
            exception.textError ||
            exception.text ||
            INTERNAL_SERVER_ERROR_MESSAGE) as string;
    }

    getStatusCode(): number {
        const exception = this.getException();
        return (exception.statusCode ||
            exception.statuscode ||
            exception.code ||
            HttpStatus.INTERNAL_SERVER_ERROR) as number;
    }

    getTimestamp(): string {
        return getCurrentUTCTimestamp();
    }
}
