import { Injectable } from '@nestjs/common';
import { ThrottlerGuard as BaseThrottlerGuard } from '@nestjs/throttler';
import requestIp from 'request-ip';

import type { Request } from 'express';

@Injectable()
export class ThrottlerGuard extends BaseThrottlerGuard {
    protected override getTracker(req: Request): Promise<string> {
        const ip = requestIp.getClientIp(req) ?? '0.0.0.0';

        const tracker = ip === '::1' ? '127.0.0.1' : ip;

        return Promise.resolve(tracker);
    }

    protected override getErrorMessage(): Promise<string> {
        return Promise.resolve('Too many requests please try later.');
    }
}
