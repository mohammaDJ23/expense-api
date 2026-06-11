import { HttpStatus } from '@nestjs/common';

import { getCurrentUTCTimestamp } from '@/common/utils/getCurrentUTCTimestamp.util';

import { INTERNAL_SERVER_ERROR_MESSAGE } from './normalizerException.constant';

export class ExceptionNormalizerEntity {
    public readonly statusCode: number;
    public readonly message: string;
    public readonly timestamp: string;

    private constructor(data: ExceptionNormalizerEntity) {
        this.statusCode = data.statusCode;
        this.message = data.message;
        this.timestamp = data.timestamp;
    }

    static create(data: Partial<ExceptionNormalizerEntity> = {}): ExceptionNormalizerEntity {
        return new ExceptionNormalizerEntity({
            statusCode: data.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
            message: data.message || INTERNAL_SERVER_ERROR_MESSAGE,
            timestamp: data.timestamp || getCurrentUTCTimestamp(),
        });
    }
}
