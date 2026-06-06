import { BadRequestException } from '@nestjs/common';

export class InvalidCredentialException extends BadRequestException {
    constructor() {
        super('Invalid credentials');
    }
}
