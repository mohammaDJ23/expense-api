import type { ResponseEntity } from '@/common/application/response/response.entity';
import type { IAppException } from '@/core/exceptions/app/exception.interface';
import type { ArgumentsHost } from '@nestjs/common';

export interface IGlobalExceptionHostHandler {
    canHandle(host: ArgumentsHost): boolean;
    send(host: ArgumentsHost, response: ResponseEntity<IAppException>): void;
}
