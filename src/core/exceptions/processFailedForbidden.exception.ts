import { ForbiddenException } from '@nestjs/common';

export class ProcessFailedForbiddenException extends ForbiddenException {
    constructor() {
        super('Process failed, try again');
    }
}
