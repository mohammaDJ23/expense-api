import { BadRequestException } from '@nestjs/common';

export class InvalidCredentialBadRequestException extends BadRequestException {
    constructor() {
        super('Invalid credentials');
    }
}
