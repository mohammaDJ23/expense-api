import { HttpStatus } from '@nestjs/common';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';

import { INTERNAL_SERVER_ERROR_MESSAGE } from './exception.constant';

import type { IAppExceptionStrategy } from './exceptionStrategy.interface';

export class FallbackStrategy implements IAppExceptionStrategy {
    canHandle(): boolean {
        return true;
    }

    getMessage(): string {
        return INTERNAL_SERVER_ERROR_MESSAGE;
    }

    getStatusCode(): number {
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }

    getTimestamp(): string {
        return getCurrentUTCTimestamp();
    }
}
