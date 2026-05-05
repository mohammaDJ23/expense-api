import { Injectable } from '@nestjs/common';

import type { IGlobalExceptionHostHandler } from '@/common/kernel/interfaces/globalExceptionHostHandler.interface';

@Injectable()
export class FallbackHostHandler implements IGlobalExceptionHostHandler {
    canHandle(): boolean {
        return false;
    }

    send(): void {
        /* empty */
    }
}
