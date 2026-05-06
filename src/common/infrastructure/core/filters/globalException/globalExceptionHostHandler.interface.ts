import type { ResponseEntity } from '@/common/kernel/entities/response.entity';
import type { IAppException } from '@/common/kernel/interfaces/appException.interface';
import type { ArgumentsHost } from '@nestjs/common';

export interface IGlobalExceptionHostHandler {
    canHandle(host: ArgumentsHost): boolean;
    send(host: ArgumentsHost, response: ResponseEntity<IAppException>): void;
}
