import { HttpStatus } from '@nestjs/common';

import { INTERNAL_SERVER_ERROR } from '@/common/constants/messages.constant';
import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';

import type { IExceptionStrategy } from './strategy.interface';

interface IObjectError extends Record<string, string | number> {}

export class ObjectStrategy implements IExceptionStrategy<IObjectError> {
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

    getException(): IObjectError {
        return this.exception as IObjectError;
    }

    getMessage(): string {
        const exception = this.getException();
        return (exception.message ||
            exception.errorText ||
            exception.textError ||
            exception.text ||
            INTERNAL_SERVER_ERROR) as string;
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
