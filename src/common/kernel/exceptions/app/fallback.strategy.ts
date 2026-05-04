import { HttpStatus } from '@nestjs/common';

import { INTERNAL_SERVER_ERROR } from '@/common/constants/messages.constant';
import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';

import type { IExceptionStrategy } from './strategy.interface';

export class FallbackStrategy implements IExceptionStrategy {
    canHandle(): boolean {
        return true;
    }

    getMessage(): string {
        return INTERNAL_SERVER_ERROR;
    }

    getStatusCode(): number {
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }

    getTimestamp(): string {
        return getCurrentUTCTimestamp();
    }
}
