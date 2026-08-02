import { Injectable } from '@nestjs/common';

import type { IGlobalFilterHostStrategy } from './globalFilterHostStrategy.interface';

@Injectable()
export class GlobalFilterFallbackHostStrategy implements IGlobalFilterHostStrategy {
    canHandle(): boolean {
        return false;
    }

    send(): void {
        /* empty */
    }
}
