import type { ArgumentsHost } from '@nestjs/common';

import type { IExceptionResponse } from './exceptionResponse.interface';

export interface IHostHandler {
    canHandle: (host: ArgumentsHost) => boolean;
    send: (host: ArgumentsHost, response: IExceptionResponse) => void;
}
