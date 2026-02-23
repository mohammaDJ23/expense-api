import type { IExceptionResponse } from './exceptionResponse.interface';
import type { ArgumentsHost } from '@nestjs/common';

export interface IHostHandler {
    canHandle: (host: ArgumentsHost) => boolean;
    send: (host: ArgumentsHost, response: IExceptionResponse) => void;
}
