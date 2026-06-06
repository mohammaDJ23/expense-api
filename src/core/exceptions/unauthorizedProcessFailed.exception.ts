import { UnauthorizedException } from '@nestjs/common';

export class UnAuthorizedProcessFailedException extends UnauthorizedException {
    constructor() {
        super('Process failed, try again');
    }
}
