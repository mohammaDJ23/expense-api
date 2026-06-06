import { InternalServerErrorException } from '@nestjs/common';

export class InternalServerProcessFailedException extends InternalServerErrorException {
    constructor() {
        super('Process failed, try again');
    }
}
