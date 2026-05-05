import { HttpStatus } from '@nestjs/common';

import { INTERNAL_SERVER_ERROR_MESSAGE } from '@/common/constants/messages.constant';
import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';

import type { IAppExceptionStrategy } from '@/common/kernel/interfaces/appExceptionStrategy.interface';

export class StringStrategy implements IAppExceptionStrategy<string> {
    constructor(private readonly exception: unknown) {}

    canHandle(): boolean {
        return typeof this.exception === 'string';
    }

    getException(): string {
        return this.exception as string;
    }

    getMessage(): string {
        return this.getException() || INTERNAL_SERVER_ERROR_MESSAGE;
    }

    getStatusCode(): number {
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }

    getTimestamp(): string {
        return getCurrentUTCTimestamp();
    }
}
