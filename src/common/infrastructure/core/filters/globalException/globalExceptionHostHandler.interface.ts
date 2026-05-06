import type { IAppException } from '@/common/infrastructure/core/exceptions/app/exception.interface';
import type { ResponseEntity } from '@/common/kernel/entities/response.entity';
import type { ArgumentsHost } from '@nestjs/common';

export interface IGlobalExceptionHostHandler {
    canHandle(host: ArgumentsHost): boolean;
    send(host: ArgumentsHost, response: ResponseEntity<IAppException>): void;
}
