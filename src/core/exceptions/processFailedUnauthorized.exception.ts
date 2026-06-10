import { UnauthorizedException } from '@nestjs/common';

export class ProcessFailedUnAuthorizedException extends UnauthorizedException {
    constructor() {
        super('Process failed, try again');
    }
}
