import { Injectable } from '@nestjs/common';

import type { IGlobalHostStrategy } from './globalHostStrategy.interface';

@Injectable()
export class GlobalFallbackHostStrategy implements IGlobalHostStrategy {
    canHandle(): boolean {
        return false;
    }

    send(): void {
        /* empty */
    }
}
