import { INTERNAL_SERVER_ERROR } from '@/common/infrastructure/exception/exception.constants';

import type { IErrorStrategy } from './errorStrategy.interface';

export class FallbackStrategy implements IErrorStrategy {
    canHandle(): boolean {
        return true;
    }

    getMessage(): string {
        return INTERNAL_SERVER_ERROR;
    }
}
