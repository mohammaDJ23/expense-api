import { HttpStatus } from '@nestjs/common';

import { ERROR_MESSAGE, SUCCESS_MESSAGE } from '@/common/constants/messages.constant';

import type { IResponse } from '@/common/kernel/interfaces/response.interface';

export class ResponseEntity<T> implements IResponse<T> {
    public message: string;
    public data: T;
    public statusCode: number;
    public success: boolean;
    public error: boolean;

    private constructor(data: ResponseEntity<T>) {
        this.message = data.message;
        this.data = data.data;
        this.statusCode = data.statusCode;
        this.success = data.success;
        this.error = data.error;
    }

    static create<K>(data: Partial<ResponseEntity<K>>): ResponseEntity<K> {
        return new ResponseEntity<K>({
            message: data.message || '',
            data: (data.data || null) as K,
            statusCode: data.statusCode || 0,
            success: data.success || false,
            error: data.error || false,
        });
    }

    static success<K>(data: Partial<ResponseEntity<K>>): ResponseEntity<K> {
        return ResponseEntity.create<K>({
            message: data.message || SUCCESS_MESSAGE,
            data: data.data,
            statusCode: data.statusCode || HttpStatus.OK,
            success: true,
            error: false,
        });
    }

    static error<K>(data: Partial<ResponseEntity<K>>): ResponseEntity<K> {
        return ResponseEntity.create<K>({
            message: data.message || ERROR_MESSAGE,
            data: data.data,
            statusCode: data.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
            success: false,
            error: true,
        });
    }
}
