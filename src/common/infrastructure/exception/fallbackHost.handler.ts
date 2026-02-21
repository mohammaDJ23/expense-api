import { Injectable } from '@nestjs/common';

import type { IHostHandler } from './hostHandler.interface';

@Injectable()
export class FallbackHostHandler implements IHostHandler {
    canHandle(): boolean {
        return false;
    }

    send(): void {
        /* empty */
    }
}
