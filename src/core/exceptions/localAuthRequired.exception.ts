import { BadRequestException } from '@nestjs/common';

export class LocalAuthProviderRequiredException extends BadRequestException {
    constructor() {
        super('This operation requires an email/password account');
    }
}
