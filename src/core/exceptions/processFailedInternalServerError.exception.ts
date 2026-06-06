import { InternalServerErrorException } from '@nestjs/common';

export class ProcessFailedInternalServerErrorException extends InternalServerErrorException {
    constructor() {
        super('Process failed, try again');
    }
}
