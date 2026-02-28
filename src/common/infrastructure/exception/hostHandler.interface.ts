import type { IAppException } from '@/common/kernel/exceptions/app/exception.interface';
import type { ArgumentsHost } from '@nestjs/common';

export interface IHostHandler {
    canHandle: (host: ArgumentsHost) => boolean;
    send: (host: ArgumentsHost, response: IAppException) => void;
}
