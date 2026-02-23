import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';

import type { IExceptionResponse } from './exceptionResponse.interface';

export class ExceptionResponseBuilder {
    static build(statusCode: number, message: string): Omit<IExceptionResponse, 'timestamp'> {
        return { statusCode, message };
    }

    static buildWithTimestamp(statusCode: number, message: string): IExceptionResponse {
        return {
            timestamp: getCurrentUTCTimestamp(),
            statusCode,
            message,
        };
    }
}
