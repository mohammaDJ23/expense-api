import { ForbiddenException } from '@nestjs/common';

export class LocalAuthProviderForbiddenException extends ForbiddenException {
    constructor() {
        super('This operation requires an email/password account');
    }
}
