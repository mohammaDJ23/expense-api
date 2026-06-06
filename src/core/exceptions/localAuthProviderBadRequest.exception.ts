import { BadRequestException } from '@nestjs/common';

export class LocalAuthProviderBadRequestException extends BadRequestException {
    constructor() {
        super('This operation requires an email/password account');
    }
}
