import { HttpStatus } from '@nestjs/common';

import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '@/common/constants/messages.constant';

import type { IResponse } from '@/common/kernel/interfaces/response.interface';

export class ResponseEntity implements IResponse {
    public message: string;
    public data: unknown;
    public statusCode: number;
    public success: boolean;
    public error: boolean;

    private constructor(data: ResponseEntity) {
        this.message = data.message;
        this.data = data.data;
        this.statusCode = data.statusCode;
        this.success = data.success;
        this.error = data.error;
    }

    static create(data: Partial<ResponseEntity>): ResponseEntity {
        return new ResponseEntity({
            message: data.message || '',
            data: data.data || null,
            statusCode: data.statusCode || 0,
            success: data.success || false,
            error: data.error || false,
        });
    }

    static success(data: Partial<ResponseEntity>): ResponseEntity {
        return ResponseEntity.create({
            message: data.message || SUCCESS_MESSAGE,
            data: data.data,
            statusCode: data.statusCode || HttpStatus.OK,
            success: true,
            error: false,
        });
    }

    static error(data: Partial<ResponseEntity>): ResponseEntity {
        return ResponseEntity.create({
            message: data.message || ERROR_MESSAGE,
            data: data.data,
            statusCode: data.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            error: true,
        });
    }
}
