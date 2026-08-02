import { Injectable, type NestMiddleware } from '@nestjs/common';

import type { IRequest } from '@/core/types/request.type';
import type { NextFunction, Response } from 'express';

@Injectable()
export class ClientTimezoneMiddleware implements NestMiddleware {
    use(req: IRequest, _: Response, next: NextFunction): void {
        req.clientTimezone = req.header('Client-Timezone');

        next();
    }
}
